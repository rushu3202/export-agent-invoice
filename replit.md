# Export AI Agent - Professional SaaS Platform

## Overview
The Export AI Agent is a full-stack SaaS platform designed to automate export documentation and ensure compliance for international trade. It offers AI-powered tools to streamline various export processes, enabling users to generate invoices, complete forms, track shipments, and receive expert advice. The platform includes robust user authentication, subscription management via Stripe, and data persistence, making it a production-ready solution for businesses involved in global trade. The project aims to provide a professional, monetized service that simplifies complex export procedures and reduces manual effort.

## User Preferences
- Professional SaaS platform design
- Complete monetization with Stripe
- User authentication and data persistence
- Real-time statistics and user profiles
- Production-ready for investors and customers
- Comprehensive export automation features
- AI-powered assistance throughout

## System Architecture
The platform is built with a React frontend and a Node.js/Express backend.
- **UI/UX**: Features a professional, responsive design using React 18, Tailwind CSS v3, and Framer Motion for animations. Includes a professional toast notification system, loading skeletons, reusable UI components, and a comprehensive settings page.
- **Authentication**: Utilizes Supabase Auth for user management, supporting Google OAuth and email/password logins, with protected routes.
- **Subscription & Billing**: Integrated with Stripe for subscription plans (Free/Pro), checkout flows, and customer portal management, with webhook integration for status updates. Includes a 7-day free trial system with upgrade prompts.
- **Database**: Supabase PostgreSQL handles data persistence for user profiles, invoices, export forms, chat history, and shipments, enforced with Row Level Security (RLS).
- **Key Features**:
    - **Dashboard**: Displays user-specific statistics with AI Insights.
    - **Invoice Generator**: Creates professional PDF invoices with AI-assigned HS codes and auto-fill features.
    - **Export Document Generator**: AI-guided completion and PDF generation for various export forms.
    - **AI Chat Assistant**: OpenAI GPT-4-mini powered expert for trade advice.
    - **Contacts/CRM**: Manage business contacts with Excel export.
    - **HS Code Finder**: AI-powered harmonized system code search.
    - **Invoice History**: Track and search all generated invoices.
    - **Shipment Tracker**: Provides real-time international shipment updates.
    - **Profile & Billing Page**: Manages user subscriptions and billing via Stripe.
    - **Onboarding Flow**: 4-step user onboarding and an interactive dashboard tour.
- **Technical Implementations**:
    - Frontend: React 18, React Router, Vite, Axios.
    - Backend: Node.js, Express 5, PDFKit for document generation, RESTful API.
    - Comprehensive form validation system (frontend and backend).
    - Global React Error Boundary for robust error handling.
    - SEO optimization, mobile responsiveness, and performance enhancements for public-facing pages.

## External Dependencies
- **Supabase**: Provides authentication services and PostgreSQL database hosting.
- **Stripe**: Handles all payment processing, subscription management, and customer billing portals.
- **OpenAI**: Powers AI features such as HS code assignment, expert chat assistance (GPT-4-mini), and AI-guided form filling.
- **Crisp Chat**: Live chat widget for customer support.
- **Google Analytics 4**: GDPR-compliant analytics for tracking user behavior and conversions.

## Production Audit - October 2025 ✅ COMPLETE
All 10 tasks completed and architect-approved for investor-ready production deployment.

### Completed Tasks (10/10)

**1. Professional Toast Notifications** - Toast system with 4 types (success/error/warning/info), replaced 19 alert() calls across 10 pages
**2. Loading Skeletons** - 6 skeleton types (table/card/list/form/stats/search), integrated across 6 pages  
**3. Upgrade Prompts** - Integrated into HS Finder and Export Forms for quota limits
**4. Form Validation System** - Comprehensive validators, useFormValidation hook, ValidatedInput components, backend middleware
**5. Settings Page** - 3-tab interface (Company Info, Preferences, Subscription), currency/language support
**6. React Error Boundary** - Global error handling with fallback UI, dev stack traces, production security
**7. UI Components Library** - WCAG 2.1 accessible components (Button, Modal with focus trap, Tabs with roving tabindex, Badge, Card, EmptyState)
**8. ShipmentTracker Auth Refactor** - Authenticated /api/track-shipment endpoint, tracking history in shipments table, toast notifications
**9. Export Forms History** - New page listing all export forms with search/filter, stats cards, Excel export, proper data mapping
**10. Google Analytics 4** - GDPR-compliant consent banner, dynamic GA4 loading, page view tracking, 12 custom events, setup documentation

## Legal Compliance & Final Audit - October 13, 2025 ✅ COMPLETE
All 7 tasks completed and architect-approved for legal compliance and production readiness.

### Completed Tasks (7/7)

**1. Platform Health Endpoint** - `/api/health` with comprehensive dependency checks (Stripe, Supabase, OpenAI), feature status monitoring, and system diagnostics
**2. Contacts Quota Enforcement** - Database migration for `contacts_created` tracking, 20/month free tier limit, unlimited pro, defensive defaults, 402 error handling with upgrade prompts
**3. Terms & Conditions Page** - Comprehensive B2B SaaS terms at `/terms` with service description, user obligations, subscription terms, AI disclaimers, intellectual property, liability limitations, and dispute resolution
**4. Privacy Policy Page** - GDPR-compliant privacy policy at `/privacy` with UK data protection, user rights, cookie policy, data retention, and international transfers
**5. Contact Us Page** - Professional support page at `/contact` with email support, technical support channels, company information, and social media links
**6. Legal Navigation** - Footer updated with Terms, Privacy, and Contact links; routes added to App.jsx with SEO metadata
**7. Production Testing** - SPA routing verified, all legal pages tested and working, database schema migrated, frontend bundle deployed to dist folder

### Quota System (Complete)
- **Documents**: 5/month free, unlimited pro
- **HS Code Searches**: 5/month free, unlimited pro  
- **AI Chat Queries**: 5/month free, unlimited pro
- **Contacts**: 20/month free, unlimited pro
- All quotas enforced with 402 responses and upgrade prompts

### Legal Pages (Complete)
- **Terms & Conditions**: `/terms` - Comprehensive B2B SaaS legal terms
- **Privacy Policy**: `/privacy` - GDPR-compliant data protection
- **Contact Us**: `/contact` - Professional support channels
- All pages include SEO metadata and mobile responsiveness