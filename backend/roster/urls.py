from django.urls import path
from . import views

urlpatterns = [
    path('timeperiod/', views.time_period, name='time_period'),
    path('slots/<int:id>/', views.slots, name='slots'),
    path('slot/<int:id>/', views.slot, name='slot'),


    path('agreementdetail/<int:id>/', views.agreementDetail, name='agreementDetail'),



    path('awards/', views.awards, name='awards'),
    path('awardClassifications/<int:award_fixed_id>/', views.awardClassifications, name='awardClassifications'),
]