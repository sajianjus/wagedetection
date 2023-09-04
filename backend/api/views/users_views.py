from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db.utils import IntegrityError

# from django.core.mail import send_mail
import sendgrid
import os
from sendgrid.helpers.mail import Mail, Email, To, Content


from django.conf import settings
import sys
from django.utils.crypto import get_random_string


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from api.serializers.users_serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken





User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, User):
        token = super().get_token(User)
        token['name'] = User.name
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer






@api_view(['POST'])
def registerUser(request):
    verification_secret = get_random_string(length=32)
    if 'password' in request.data and 'email' in request.data and 'name' in request.data:
        try:
            user = User.objects.create_user(
                email=request.data['email'],
                name = request.data['name'],
                password=request.data['password'],
                is_active=False,
                is_staff=False,
                is_superuser=False,
                sent_verification_email=False,
                verified_email=False,
                verification_email_secret=verification_secret,
            )
        except IntegrityError:
            return Response({'message':'User already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message':'User could not be registered.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            type = "text/html"
            html_text = f"""
                        <html>
                            <body>
                                <p>
                                    To verify your user account for {settings.WEB_SITE_NAME}, please go to {settings.VERIFICATION_URL}{verification_secret} <br>
                                    <b>
                                        <i>
                                            Please <a href='{settings.VERIFICATION_URL}{verification_secret}'>Click this link</a> to verify your useraccount for {settings.WEB_SITE_NAME}. 
                                        </i>
                                    </b>
                                </p>
                            </body>
                        </html>
                        """

            sg = sendgrid.SendGridAPIClient(api_key="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")
            from_email = Email("teamm@synapseindia.com")  # Change to your verified sender
            to_email = To([request.data['email']])  # Change to your recipient
            subject = f'Verify your user account for {settings.WEB_SITE_NAME}.'
            content = Content(type,html_text)
            mail = Mail(from_email, to_email, subject, content)

            # Get a JSON-ready representation of the Mail object
            mail_json = mail.get()

            # Send an HTTP POST request to /mail/send
            response = sg.client.mail.send.post(request_body=mail_json)
            print(response.status_code)
            print(response.headers)
            user.sent_verification_email=True
            user.save()
        except:
            print("send_mail exception", sys.exc_info())
            return Response({'message':'verification email could not be sent'}, startus=status.HTTP_400_BAD_REQUEST)
        return Response({'message':'User registered.'}, status=status.HTTP_200_OK)
    return Response({'message':'User information missing.'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def verifyUser(request):
    try:
        verification_secret=request.data['verification_secret']
        user = User.objects.get(verification_email_secret=verification_secret)
        user.verified_email=True
        user.is_active=True
        user.save()
        return Response({'message':'user verified'}, status=status.HTTP_200_OK)
    except:
        return Response({'message':'unable verify user'}, status=status.HTTP_400_BAD_REQUEST)
    




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)





@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    update_flag = False
    print(request.user)
    user=User.objects.get(email=request.user)
    print("1")
    if 'name' in request.data:
        user.name = request.data['name']
        update_flag=True
    if 'password' in request.data:
        user.password = make_password(request.data['password'])
        update_flag=True
    if update_flag:
        user.save()
    access_token = RefreshToken.for_user(user)
    access_token['name'] = user.name
    return Response({'access': str(access_token.access_token), 'refresh':str(access_token)},status=status.HTTP_200_OK)







@api_view(['POST'])
def forgotPassword(request):
    if "email" in request.data:
        reset_secret = get_random_string(length=32)
        try:
            user = User.objects.get(email=request.data['email'])
            user.reset_password_secret = reset_secret
            user.save()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)




        try:
            type = "text/html"
            html_text = f"""
                        <html>
                            <body>
                                <p>
                                    To reset your password for {settings.WEB_SITE_NAME}, please go to {settings.RESET_PASSWORD_URL}{reset_secret} <br>
                                    <b>
                                        <i>
                                            Please <a href="{settings.RESET_PASSWORD_URL}{reset_secret}">Click this link</a>to reset your password for {settings.WEB_SITE_NAME}. 
                                        </i>
                                    </b>
                                </p>
                            </body>
                        </html>
                            """

            sg = sendgrid.SendGridAPIClient(api_key="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")
            from_email = Email("teamm@synapseindia.com")  # Change to your verified sender
            to_email = To([request.data['email']])  # Change to your recipient
            subject = f'Password reset for your account on {settings.WEB_SITE_NAME}'
            content = Content(type,html_text)
            mail = Mail(from_email, to_email, subject, content)

            # Get a JSON-ready representation of the Mail object
            mail_json = mail.get()

            # Send an HTTP POST request to /mail/send
            response = sg.client.mail.send.post(request_body=mail_json)
            print(response.status_code)
            print(response.headers)
        except:
            pass
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def resetPassword(request):
    if 'password' not in request.data:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(reset_password_secret=request.data['reset_secret'])
        user.password=make_password(request.data['password'])
        user.save()
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_200_OK)