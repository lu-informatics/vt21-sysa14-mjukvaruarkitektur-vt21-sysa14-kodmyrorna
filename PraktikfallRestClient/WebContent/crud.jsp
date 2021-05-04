<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
      <meta charset="ISO-8859-1">
      <link rel="stylesheet" type="text/css" href="css/restclient.css">
      <script src="js/restclient.js"></script>
      <title>RestClient</title>
   </head>
   <body>
      <header>
         <p>RestClient</p>
      </header>
      <section id="row">
         <nav>
            <ul>
               <li class="active"><a href="crud.jsp">Person</a></li>
               <li><a>Project</a></li>
               <li><a>Assignments</a></li>
            </ul>
         </nav>
         <aside>
            <table id="asideTable">
               <tr>
                  <th><span id="city"></span></th>
                  <th><span></span></th>
                  <th><span></span></th>
                  <th><span id="ipNbr"></span></th>
               </tr>
               <tr>
                  <td><span id="degree"></span></td>
                  <td><span></span></td>
                  <td><span></span></td>
               </tr> 
		<tr>
                  <td><span id="weather"></span></td>
               </tr>

               <tr>
                  <td colspan="4"><span id="sunrise"></span></td>
               </tr>
               <tr>
                  <td colspan="4"><span id="sunset"></span></td>
               </tr>
            </table>
         </aside>
         <section id="main">
            <section id="content">
               <article>
                  <fieldset id="PersonalFS">
                     <legend>Person:</legend>
                     Ssn:<br>
                     <input type="text" name="ssn" id="ssn" value="" maxlength = 10><br>
                     Name:<br>
                     <input type="text" name="name" id="name" value="">
                     <br><br>
                     <input type="button" name="submitBtn" value="Find" id="FindBtn">
                     <input type="button" name="submitBtn" value="Add" id="AddBtn">
                     <input type="button" name="submitBtn" value="Delete" id="DeleteBtn">
                     <input type="button" name="submitBtn" value="Update" id="UpdateBtn">
                  </fieldset>
                  <p id="FeedbackPerson"></p>
               </article>
            </section>
         </section>
      </section>
      <footer>
         <p>&copy; Arbetsgrupp 7 2021 </p>
      </footer>
   </body>
</html>