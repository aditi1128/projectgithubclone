from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('repository.urls')),  # Include the URLs from the repository app
    # Add any other global URL patterns here
]
