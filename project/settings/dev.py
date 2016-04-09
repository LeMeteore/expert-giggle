#!/usr/bin/env python
# -*- coding:utf-8 -*-

""" Development settings """

from .base import *

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

DEBUG = True

AUTH_PASSWORD_VALIDATORS = []

# See: http://django-debug-toolbar.readthedocs.org/en/latest/installation.html#explicit-setup
INSTALLED_APPS += [
    'debug_toolbar',
    'django_extensions',
    'template_debug',
]

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIAL_URL = '/media/'

STATIC_URL = '/static/'
STATIC_ROOT = 'static' # to be used in production
# Additional locations of static files
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
