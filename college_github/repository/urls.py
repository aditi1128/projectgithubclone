from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RepositoryViewSet, UserListView, UserDetailView, AddCollaboratorView

router = DefaultRouter()
router.register(r'repositories', RepositoryViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('repositories/<int:pk>/add_collaborator/', AddCollaboratorView.as_view(), name='add-collaborator'),
    # Add more URL patterns here for other views
]
