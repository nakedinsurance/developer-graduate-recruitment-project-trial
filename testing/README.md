# Using `backend.rest` with VS Code and REST Client

This guide will walk you through how to execute HTTP requests written in a file called `backend.rest` using Visual Studio Code (VS Code) and the **REST Client** extension.

### Prerequisites
Before you begin, make sure you have the following:
1. **VS Code**: Installed on your computer.
2. **REST Client Extension**: Installed in VS Code. If you haven't installed it yet, follow these steps:
   - Open VS Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
   - In the search box, type `rest-client` and find **"REST Client"** by **humao**.
   - Click **Install**.

---

### Step-by-Step Instructions

1. **Open VS Code**  
   Launch your VS Code editor.

2. **Open the `backend.rest` file**  

3. **Understand the `backend.rest` file**  
   The `.rest` file contains HTTP requests that can be executed directly from VS Code. Here's an example of what an HTTP request in your `backend.rest` file might look like:

   ```http
   GET https://api.example.com/users
   Content-Type: application/json
   ```

   This is a simple GET request that will fetch data from the `/users` endpoint of the API at `https://api.example.com`.

4. **Execute an HTTP Request**  
   - Inside the `backend.rest` file, place your cursor anywhere within the HTTP request you want to execute.
   - You should see a small "Send Request" link appear above the request. Click it, or press `Ctrl+Alt+R` (or `Cmd+Alt+R` on Mac) to send the request.

5. **View the Response**  
   Once you send the request, a new tab will open in VS Code, showing the response from the server. This will include:
   - The HTTP status code (e.g., `200 OK`, `404 Not Found`).
   - Response body (the actual data or message returned).
   - Response headers.

6. **Run Multiple Requests**  
   If your `backend.rest` file contains more than one request, you can execute them one by one by placing the cursor inside the request you want and then clicking "Send Request."

   Example of multiple requests:

   ```http
   ### Get all users
   GET https://api.example.com/users

   ### Create a new user
   POST https://api.example.com/users
   Content-Type: application/json

   {
       "name": "John Doe",
       "email": "john@example.com"
   }
   ```

7. **Save Responses** (Optional)  
   You can save the response to a file if needed:
   - Right-click inside the response tab.
   - Select **Save Response** and choose a location on your computer to save the file.

---

### Tips

- You can use comments in your `.rest` file by starting lines with `###`. These comments won't be executed.
- Make sure the API URL and method (GET, POST, etc.) are correct, or you'll get errors.
- You can test APIs with different request types like `GET`, `POST`, `PUT`, and `DELETE`.

---

That’s it! You now know how to execute HTTP requests using the `backend.rest` file and the REST Client extension in VS Code.