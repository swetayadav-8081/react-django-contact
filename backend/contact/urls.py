from django.urls import path
from .views import ContactCreateView

urlpatterns = [
    path(' ', ContactCreateView, name='contact-create'),
]
