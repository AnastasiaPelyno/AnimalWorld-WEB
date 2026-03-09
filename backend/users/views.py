from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer, UpdateProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.authtoken.models import Token  
from django.contrib.auth import authenticate, login, logout
from drf_yasg.utils import swagger_auto_schema
from .models import User

class RegisterUser(APIView):
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() 
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'User registered successfully',
                'user': serializer.data,
                "token": token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            token = serializer.validated_data['token']
            user = serializer.validated_data['user'] 

            if user:
                return Response({
                    'message': 'Login successful',
                    'token': token,
                    'user': {
                        'user_id': user.id,  
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'phone_number': user.phone_number
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)  
        return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]  
    
    def get(self, request):
        user = User.objects.get(id=request.user.id)
        return Response({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone_number': user.phone_number,
            'email': user.email
        })
    
    @swagger_auto_schema(request_body=UpdateProfileSerializer)
    def put(self, request):
        user = User.objects.get(id=request.user.id)
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.phone_number = request.data.get('phone_number', user.phone_number)
        
        if 'password' in request.data:
            user.set_password(request.data['password'])  
        user.save()
        
        return Response({"detail": "Profile updated successfully"})