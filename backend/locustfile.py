from locust import HttpUser, task, between

class AnimalWorldTester(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        self.token = None
        response = self.client.post("/api/users/login/", json={
            "email": "test@example.com",
            "password": "testpassword123" 
        })
        if response.status_code == 200:
            self.token = response.json().get('token')

    @task(3) 
    def load_products_list(self):
        """Перегляд списку всіх товарів"""
        if self.token:
            headers = {'Authorization': f'Token {self.token}'}
            self.client.get("/api/products/products/", headers=headers)
        else:
            self.client.get("/api/products/products/")

    @task(1)
    def view_single_product(self):
        """Перегляд сторінки одного конкретного товару"""
        if self.token:
            headers = {'Authorization': f'Token {self.token}'}
            self.client.get("/api/products/products/1/", headers=headers)