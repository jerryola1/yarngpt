import modal

handle = modal.Function.from_name("yarn-gpt-api", "show-url")
print(handle.web_url)