import os
import sys

# 1. SETUP DJANGO (This triggers settings.py which loads your .env vars)
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fanhub.settings')
os.environ['EMAIL_BACKEND'] = 'django.core.mail.backends.console.EmailBackend'

import django
django.setup()

from django.contrib.auth import get_user_model
from django.conf import settings
from accounts.services import PasswordResetService

User = get_user_model()

def test_password_reset():
    print("=" * 60)
    print("DJANGO PASSWORD RESET DIAGNOSTIC")
    print("=" * 60)

    # --- 1. VERIFY CONFIGURATION LOADED FROM .ENV ---
    print("\nEMAIL CONFIGURATION (from settings.py):")
    print(f"   Backend:      {settings.EMAIL_BACKEND}")
    print(f"   Host:         {settings.EMAIL_HOST}")
    print(f"   Port:         {settings.EMAIL_PORT}")
    print(f"   TLS:          {settings.EMAIL_USE_TLS}")
    print(f"   User:         {settings.EMAIL_HOST_USER}")
    print(f"   Password Set: {'Yes' if settings.EMAIL_HOST_PASSWORD else 'No'}")
    print(f"   From Email:   {settings.DEFAULT_FROM_EMAIL}")
    print(f"   Frontend URL: {settings.FRONTEND_URL}")

    # Check for common misconfigurations
    if not settings.EMAIL_HOST_USER:
        print("   WARNING: EMAIL_HOST_USER is empty!")
    if not settings.EMAIL_HOST_PASSWORD:
        print("   WARNING: EMAIL_HOST_PASSWORD is empty!")
    if not settings.DEFAULT_FROM_EMAIL:
        print("   WARNING: DEFAULT_FROM_EMAIL is empty!")

    # --- 2. ENSURE USER EXISTS ---
    # CHANGE THIS to the email you are actually testing with
    test_email = os.getenv('TEST_RESET_EMAIL', 'example@gmail.com')
    
    print(f"\nCHECKING USER: {test_email}")
    try:
        user = User.objects.get(email=test_email)
        print(f"   Found: {user.username} (Active: {user.is_active})")
        if not user.is_active:
            print("   WARNING: User is inactive. Reset emails are only sent to active users.")
    except User.DoesNotExist:
        print(f"   User not found. Creating a temporary test user...")
        user = User.objects.create_user(
            username='temp_test_user',
            email=test_email,
            password='TempPass123!'
        )
        print(f"   Created: {user.username}")

    # --- 3. SEND RESET EMAIL ---
    print("\nATTEMPTING TO SEND RESET EMAIL:")
    
    try:
        token_data = PasswordResetService.generate_reset_token(user)
        PasswordResetService.send_reset_email(user, token_data)

        print("\n   SUCCESS: Email dispatched to SMTP server.")
        print(f"   -> Check inbox/spam for: {test_email}")
        print(f"   -> Link should start with: {settings.FRONTEND_URL}/?uid=...")
        return True

    except Exception as e:
        print(f"\n   FAILED: {type(e).__name__}")
        print(f"   Error Details: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    success = test_password_reset()
    print("\n" + "=" * 60)
    sys.exit(0 if success else 1)