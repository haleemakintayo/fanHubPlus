#!/usr/bin/env python
"""
Standalone Database Seed Script for Fan Hub Plus
Runs migrations (if needed) and executes the `seed_data` management command,
seeding Stream & Discover trailers, audio tracks, categories, characters,
merchandise, events, and demo users.

Usage:
    python seed_db.py
"""
import os
import sys
import django


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fanhub.settings')
    django.setup()

    from django.core.management import call_command

    print("=====================================================")
    print("  FAN HUB PLUS - DATABASE MIGRATION & SEED RUNNER")
    print("=====================================================")
    call_command('makemigrations', 'fandoms')
    call_command('migrate')
    call_command('seed_data')
    print("=====================================================")
    print("  SEED COMPLETE!")
    print("=====================================================")


if __name__ == '__main__':
    main()
