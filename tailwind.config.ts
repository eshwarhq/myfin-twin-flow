import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					start: 'hsl(var(--accent-start))',
					end: 'hsl(var(--accent-end))',
					DEFAULT: 'hsl(var(--accent-start))',
					foreground: 'hsl(var(--foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(4px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-glow': {
					'0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 hsl(var(--accent-blue) / 0.3)' },
					'50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 8px hsl(var(--accent-blue) / 0)' },
					'100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 hsl(var(--accent-blue) / 0)' }
				},
				'morph-to-circle': {
					'0%': { borderRadius: 'var(--radius)', aspectRatio: 'auto' },
					'100%': { borderRadius: '50%', aspectRatio: '1' }
				},
				'morph-to-rect': {
					'0%': { borderRadius: '50%', aspectRatio: '1' },
					'100%': { borderRadius: 'var(--radius)', aspectRatio: 'auto' }
				},
				'ambient-drift': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)' },
					'33%': { transform: 'translate(2%, -1%) rotate(0.5deg)' },
					'66%': { transform: 'translate(-1%, 2%) rotate(-0.3deg)' },
					'100%': { transform: 'translate(0, 0) rotate(0deg)' }
				},
				'shared-expand': {
					'0%': { transform: 'scale(1)', zIndex: '1' },
					'100%': { transform: 'scale(1.05)', zIndex: '50' }
				},
				'background-fade': {
					'0%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '0.2', transform: 'scale(0.98)' }
				},
				'explain-expand': {
					'0%': { height: '0', opacity: '0', marginTop: '0' },
					'100%': { height: 'auto', opacity: '1', marginTop: '0.5rem' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s var(--ease-enter)',
				'accordion-up': 'accordion-up 0.2s var(--ease-exit)',
				'fade-in': 'fade-in var(--duration-normal) var(--ease-enter)',
				'slide-up': 'slide-up var(--duration-slow) var(--ease-enter)',
				'pulse-glow': 'pulse-glow var(--duration-pulse) infinite',
				'morph-to-circle': 'morph-to-circle var(--duration-slow) var(--ease-standard) forwards',
				'morph-to-rect': 'morph-to-rect var(--duration-slow) var(--ease-standard) forwards',
				'ambient-drift': 'ambient-drift 20s ease-in-out infinite',
				'shared-expand': 'shared-expand 220ms var(--ease-enter) forwards',
				'background-fade': 'background-fade 220ms var(--ease-enter) forwards',
				'explain-expand': 'explain-expand var(--duration-normal) var(--ease-enter) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
