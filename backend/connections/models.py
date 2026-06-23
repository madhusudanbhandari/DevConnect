from django.db import models
from accounts.models import User

# Create your models here.

class Connection(models.Model):
    STATUS_CHOICES=[
        ("accepted","Accepted"),
        ("pending","Pending"),
        ("rejected","Rejected"),
    ]

    from_user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="sent_requests")
    to_user=models.ForeignKey(User,on_delete=models.CASCADE,related_name="received_requests")

    status=models.CharField(max_length=10,choices=STATUS_CHOICES,default="pending")
    created_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together=("from_user","to_user")

    def __str__(self):
        return f"{self.from_user}->{self.to_user} ({self.status})"