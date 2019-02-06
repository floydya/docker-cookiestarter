import os
import shutil

create_docs = '{{ cookiecutter.docs }}' == 'Enable'
create_user = '{{ cookiecutter.user_model }}' == 'Enable'


def remove(filepath):
    if os.path.isfile(filepath):
        os.remove(filepath)
    elif os.path.isdir(filepath):
        shutil.rmtree(filepath)


if not create_docs:
    remove(os.path.join(os.getcwd(), 'server', 'docs'))

if not create_user:
    remove(os.path.join(os.getcwd(), 'server', 'apps', 'account'))
