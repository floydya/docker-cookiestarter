import environ
import jinja2
from pathlib import Path
from django_jinja.builtins import DEFAULT_EXTENSIONS

BASE_DIR = Path(__file__)
BASE_ROOT = BASE_DIR.parent.parent

env = environ.Env(DEBUG=(bool, False),)

SECRET_KEY = env('DJANGO_SECRET_KEY')
DEBUG = False
ALLOWED_HOSTS = list()

PROJECT_APPS = [
    'markup',
    {% if cookiecutter.user_model == 'Enable' %}'apps.account',{% endif %}
]

INSTALLED_APPS = PROJECT_APPS + [
    'rosetta',

    'django_jinja',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware'
]

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django_jinja.backend.Jinja2',
        'NAME': 'jinja2',
        'APP_DIRS': True,
        'DIRS': [],
        'OPTIONS': {
            'environment': 'shared.env.jinja2.environment',
            'match_extension': '.jinja',
            'newstyle_gettext': True,
            'auto_reload': True,
            'undefined': jinja2.Undefined,
            'debug': True,
            'filters': {},
            'globals': {},
            'context_processors': [
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.debug',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',
            ],
            'extensions': DEFAULT_EXTENSIONS,
            "bytecode_cache": {
                "name": "default",
                "backend": "django_jinja.cache.BytecodeCache",
                "enabled": True,
            },
        },
    },
    {
        'DIRS': [],
        'APP_DIRS': True,
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.messages.context_processors.messages',
                'django.contrib.auth.context_processors.auth',
            ],
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'

DATABASES = {
    'default': env.db('DJANGO_DB_URL')
}
DATABASES['default']['CONN_MAX_AGE'] = env.int('CONN_MAX_AGE', default=0)

{% if cookiecutter.user_model == 'Enable' %}
AUTH_USER_MODEL = 'account.User'
{% endif %}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = '{{ cookiecutter.language.lang_code }}'
LANGUAGES = (
    ('{{ cookiecutter.language.lang_code }}', '{{ cookiecutter.language.lang_name }}'),
)
LOCALE_PATHS = (
    BASE_ROOT / 'locale',
)

TIME_ZONE = '{{ cookiecutter.timezone }}'
USE_I18N = True
USE_L10N = True
USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = BASE_ROOT / 'static'
MEDIA_URL = '/uploads/'
MEDIA_ROOT = BASE_ROOT / 'uploads'

SITE_ID = 1
CACHES = {
    'default': env.cache_url('DJANGO_CACHE_URL', 'dummycache://127.0.0.1')
}
EMAIL_CONFIG = env.email_url('DJANGO_EMAIL_URL', 'consolemail://127.0.0.1')
vars().update(EMAIL_CONFIG)

CELERY_BROKER_URL = env.str('CELERY_BROKER_URL')
# CELERY_RESULT_BACKEND = env.str('CELERY_BROKER_URL') + "/0"
# CELERY_ACCEPT_CONTENT = ['json']
# CELERY_TASK_SERIALIZER = 'json'
# CELERY_RESULT_SERIALIZER = 'json'

if not DEBUG:
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'django': {
                'level': 'ERROR',
                'class': 'shared.logs.MakeFileHandler',
                'filename': '/var/log/django/error.log',
            },
            'console': {
                'level': 'ERROR',
                'class': 'logging.StreamHandler'
            },
            'celery': {
                'level': 'ERROR',
                'class': 'shared.logs.MakeFileHandler',
                'filename': '/var/log/celery/error.log',
            }
        },
        'loggers': {
            'django': {
                'handlers': ['django', 'console'],
                'level': 'ERROR',
                'propagate': True,
            },
            'celery': {
                'handlers': ['celery', 'console'],
                'level': 'ERROR',
                'propagate': True
            }
        },
    }

