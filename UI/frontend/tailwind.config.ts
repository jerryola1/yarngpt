import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'oklch(var(--background) / <alpha-value>)',
  			foreground: 'oklch(var(--foreground) / <alpha-value>)',
  			card: {
  				DEFAULT: 'oklch(var(--card) / <alpha-value>)',
  				foreground: 'oklch(var(--card-foreground) / <alpha-value>)'
  			},
  			popover: {
  				DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
  				foreground: 'oklch(var(--popover-foreground) / <alpha-value>)'
  			},
  			primary: {
  				DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
  				foreground: 'oklch(var(--primary-foreground) / <alpha-value>)'
  			},
  			secondary: {
  				DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
  				foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)'
  			},
  			muted: {
  				DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
  				foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
  			},
  			accent: {
  				DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
  				foreground: 'oklch(var(--accent-foreground) / <alpha-value>)'
  			},
  			destructive: {
  				DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
  				foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)'
  			},
  			border: 'oklch(var(--border) / <alpha-value>)',
  			input: 'oklch(var(--input) / <alpha-value>)',
  			ring: 'oklch(var(--ring) / <alpha-value>)',
  			brand: {
  				primary: 'oklch(var(--brand-primary) / <alpha-value>)',
  				cline: 'oklch(var(--brand-cline) / <alpha-value>)',
  				roo: 'oklch(var(--brand-roo) / <alpha-value>)',
  				continue: 'oklch(var(--brand-continue) / <alpha-value>)',
  				context7: 'oklch(var(--brand-context7) / <alpha-value>)',
  				openrouter: 'oklch(var(--brand-openrouter) / <alpha-value>)'
  			},
  			producthunt: {
  				DEFAULT: 'oklch(var(--producthunt) / <alpha-value>)',
  				foreground: 'oklch(var(--producthunt-foreground) / <alpha-value>)'
  			},
  			state: {
  				true: 'oklch(var(--state-true) / <alpha-value>)',
  				'true-foreground': 'oklch(var(--state-true-foreground) / <alpha-value>)',
  				false: 'oklch(var(--state-false) / <alpha-value>)',
  				'false-foreground': 'oklch(var(--state-false-foreground) / <alpha-value>)'
  			},
  			chart: {
  				'1': 'oklch(var(--chart-1) / <alpha-value>)',
  				'2': 'oklch(var(--chart-2) / <alpha-value>)',
  				'3': 'oklch(var(--chart-3) / <alpha-value>)',
  				'4': 'oklch(var(--chart-4) / <alpha-value>)',
  				'5': 'oklch(var(--chart-5) / <alpha-value>)',
  				'6': 'oklch(var(--chart-6) / <alpha-value>)',
  				'7': 'oklch(var(--chart-7) / <alpha-value>)',
  				'8': 'oklch(var(--chart-8) / <alpha-value>)',
  				'9': 'oklch(var(--chart-9) / <alpha-value>)',
  				'10': 'oklch(var(--chart-10) / <alpha-value>)'
  			},
  			sidebar: {
  				DEFAULT: 'oklch(var(--sidebar-background) / <alpha-value>)',
  				foreground: 'oklch(var(--sidebar-foreground) / <alpha-value>)',
  				primary: 'oklch(var(--sidebar-primary) / <alpha-value>)',
  				'primary-foreground': 'oklch(var(--sidebar-primary-foreground) / <alpha-value>)',
  				accent: 'oklch(var(--sidebar-accent) / <alpha-value>)',
  				'accent-foreground': 'oklch(var(--sidebar-accent-foreground) / <alpha-value>)',
  				border: 'oklch(var(--sidebar-border) / <alpha-value>)',
  				ring: 'oklch(var(--sidebar-ring) / <alpha-value>)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-poppins)',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-jetbrains)',
  				'monospace'
  			],
  			jetbrains: [
  				'var(--font-jetbrains)',
  				'monospace'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;