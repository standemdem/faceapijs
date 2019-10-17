from selenium import webdriver
import time

driver = webdriver.Chrome() 
url = 'http://127.0.0.1:5000/'
driver.get(url)
while True:
    scriptArray="""
    
                    localStorage.getItem('myStorage')
                    return Array.apply(0, new Array(localStorage.length))
                    .map((o, i) => { 
                        return localStorage.getItem(localStorage.key(i)); 
                        }
                    )
                    
                    """ 	
    result = driver.execute_script(scriptArray)
    print(result)
    time.sleep(15)