from django.urls import path
from .views import InventoryList, InventoryDetail, ProductsList, ProductsDetail, InventoryListById 
from .views import MediKitLocation, MediKitLocationDetail
from .views import EmergencyList, EmergencyDetail, MedicationList, MedicationDetail, MedicationListById

# URLs for view interaction
urlpatterns = [
    path('products/', ProductsList.as_view(), name="products_list"),
    path('products/<int:pk>/', ProductsDetail.as_view(), name='products_detail'),

    path('inventory/', InventoryList.as_view(), name="inventory_list"),
    path('inventorylistbyid/<int:pk>/', InventoryListById.as_view(), name='inventory_list_by_id'),
    path('inventory/<int:pk>/', InventoryDetail.as_view(), name='inventory_detail'),

    path('location/', MediKitLocation.as_view(), name="medi_kit_location"),
    path('location/<int:pk>/', MediKitLocationDetail.as_view(), name="medi_kit_location_detail"),

    path('emergency/', EmergencyList.as_view(), name="emergency_list"),
    path('emergency/<int:pk>/', EmergencyDetail.as_view(), name='emergency_detail'),

    path('medication/', MedicationList.as_view(), name="medication_list"),
    path('medication/<int:pk>/', MedicationDetail.as_view(), name='medication_detail'),
    path('medicationlistbyid/<int:pk>/', MedicationListById.as_view(), name='medication_list_by_id'),
] 