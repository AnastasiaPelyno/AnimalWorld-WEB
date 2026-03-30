import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

print("🤖 Запускаємо браузер-бота для збору товарів AnimalWorld...")

try:
    chrome_path = os.path.join(os.getcwd(), "chrome-win64", "chrome.exe")
    driver_path = os.path.join(os.getcwd(), "chromedriver-win64", "chromedriver.exe")
    
    options = Options()
    options.binary_location = chrome_path 
    service = Service(driver_path) 
    
    driver = webdriver.Chrome(service=service, options=options)
    
    print("Відкриваємо сторінку авторизації...")
    driver.get("http://localhost:3000/login") 
    driver.maximize_window() 
    
    wait = WebDriverWait(driver, 10)
    
    print("🔑 Проходимо авторизацію...")
    email_input = wait.until(EC.presence_of_element_located((By.NAME, "email")))
    password_input = driver.find_element(By.NAME, "password")
    
    email_input.send_keys("test@example.com") 
    password_input.send_keys("1111") 
    
    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    login_button.click()
    
    print("⏳ Чекаємо переходу на головну сторінку...")
    time.sleep(3)
    
    if "login" in driver.current_url:
        print("\n ПОМИЛКА ВХОДУ! Бот залишився на сторінці логіну.")
        print(" Перевір, чи правильно ти вказала email та пароль у коді!")
    else:
        print("✅ Успішний вхід! Шукаємо картки товарів...")
        try:
            products_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//*[contains(text(), 'Products')]")))
            products_btn.click()
            
            print("⏳ Чекаємо завантаження каталогу...")
            wait.until(EC.presence_of_element_located((By.CLASS_NAME, "product-card")))
            
            page_number = 1
            has_next_page = True
            
            while has_next_page:
                print(f"\n--- 📦 ЗІБРАНІ ТОВАРИ (Сторінка {page_number}) ---")
                time.sleep(2) 
                
                product_cards = driver.find_elements(By.CLASS_NAME, "product-card")
                for idx, card in enumerate(product_cards, 1):
                    # Базові дані
                    name = card.find_element(By.TAG_NAME, "h3").text
                    price = card.find_element(By.CLASS_NAME, "price").text
                    
                    try:
                        img = card.find_element(By.CLASS_NAME, "product-image")
                        img_url = img.get_attribute("src")
                    except:
                        img_url = "Немає фото"
                        
                    try:
                        discount = card.find_element(By.CLASS_NAME, "discount").text
                    except:
                        discount = "Без знижки"
                        
                    try:
                        old_price = card.find_element(By.CLASS_NAME, "original-price").text
                    except:
                        old_price = ""
                        
                    print(f"{idx}. {name}")
                    if discount != "Без знижки":
                        print(f"   Ціна: {price} (Стара ціна: {old_price}) | Знижка: {discount}")
                    else:
                        print(f"   Ціна: {price}")
                    print(f"   Фото: {img_url}\n")
                    
                next_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Наступна')]")
                
                if next_button.get_attribute("disabled"):
                    print("\n✅ Всі сторінки успішно зібрано! Каталог закінчився.")
                    has_next_page = False
                else:
                    print(f"-> Клікаємо 'Наступна', переходимо на сторінку {page_number + 1}...")
                    driver.execute_script("arguments[0].scrollIntoView();", next_button)
                    time.sleep(1)
                    next_button.click()
                    page_number += 1
        except Exception as e:
            print("\n Товари не знайдені! Можливо, база даних порожня.")

except Exception as e:
    print(f"\n ГЛОБАЛЬНА ПОМИЛКА: {e}")

finally:
    time.sleep(5) 
    try:
        driver.quit()
    except:
        pass
    print(" Бот завершив роботу!")