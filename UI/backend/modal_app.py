import modal
from app.main import app as fastapi_app

# Configure the container image with required dependencies and environment
image = (
    modal.Image.debian_slim()
    .pip_install(
        "fastapi", "uvicorn", "yarngpt", "cloudinary", "torchaudio", "python-dotenv", "pydantic"
    )
    .env({"HF_HOME": "/cache"})
    .add_local_python_source("_remote_module_non_scriptable", "app")
)

# Create a volume for caching Hugging Face models (if needed)
volume = modal.Volume.from_name("yarngpt-cache", create_if_missing=True)

# Initialize the Modal App
app = modal.App("yarn-gpt-api")

@app.function(image=image, gpu="A100", secrets=[modal.Secret.from_name("yarngpt-CLOUDINARY-secret")], volumes={"/cache": volume})
@modal.asgi_app()
def fastapi_app():
    from app.main import app as fastapi_app
    return fastapi_app

if __name__ == "__main__":
    app.deploy()
