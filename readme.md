1. ## Backend start
- To start the backend please add .env file in backend where you write the varaiables: 

    - DB_CONNECT=||your connection string in mongo||
    - ACCESS_TOKEN_SECRET=||random string as key for jwt tokens||
    
- Then write "npm install" in the terminal inside the folder backend.
- Next write "nodemon" in the terminal in backend.

2. ## Frontend start
- To start the frontend write "npm install" in the terminal inside the folder frontend.
- Then write "npm start" in the terminal in fronted.

3. ## Interface images

![image](https://user-images.githubusercontent.com/94305034/174592108-7747061b-77bc-4f30-89d1-57edb9f2a648.png)

![image](https://user-images.githubusercontent.com/94305034/174591938-d3d365a0-4380-40cc-b1e2-0fb213c823e8.png)

![image](https://user-images.githubusercontent.com/94305034/174591971-a58b69c0-45bd-4d3b-82ac-6d975b9460e4.png)

![image](https://user-images.githubusercontent.com/94305034/174592062-fc43e89b-026b-4c6d-94a7-2ba9540e8fa9.png)

![image](https://user-images.githubusercontent.com/94305034/174592149-ca8ae45a-18cf-40be-8d1b-c4107ed0c73d.png)

![image](https://user-images.githubusercontent.com/94305034/174592191-94740f88-e322-424a-8a88-4f8e77cf67fe.png)

![image](https://user-images.githubusercontent.com/94305034/174592248-8c46eee3-3cdd-4f6a-827c-4280e11d1901.png)

 ## Functionalities
 Register 
 
 * bcrypt password hash and salt
 * validation in middleware
 
 Login
 
 * jwt authentication
 
 Create contact

 * add image
 * default image (image is not mandatory)
 * send as FormData object
 * validation in fornted and backend, regex to match telephone.
 * images saved in backend as file, in base just path to file
 
 List Contacts 
 
 * Image, first name, last name.
 * 2 icons as buttons
 * call icon, to call if you are from phone or to redirect phone number to your phone
 * info icon, to navigate you to path /contacts/:id to see detailed infomation about contact 
 
 Contact 
 
 * you see image, first name, last name, number.
 * 2 buttons
 * edit 
 * delete
