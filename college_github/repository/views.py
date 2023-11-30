from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Repository
from .serializers import RepositorySerializer

class RepositoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing repository instances.
    """
    serializer_class = RepositorySerializer
    queryset = Repository.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, request, *args, **kwargs):
        repository = get_object_or_404(Repository, pk=kwargs['pk'])
        if repository.owner != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
class AddCollaboratorView(generics.UpdateAPIView):
    queryset = Repository.objects.all()
    serializer_class = RepositoryCollaboratorsSerializer

    def update(self, request, *args, **kwargs):
        repository = self.get_object()
        user_to_add = get_object_or_404(User, pk=request.data.get('user_id'))
        repository.collaborators.add(user_to_add)
        return Response({'status': 'collaborator added'})

# Add more views for other functionalities like user management, collaboration, etc.
