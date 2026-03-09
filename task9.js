$(document).ready(function () {
  

  const formData = [
    {
      label: "Name",
      type: "text",
      id: "name",
      required: true,
    },

    {
      label: "Email",
      type: "email",
      id: "email",
      required: true,
    },

    {
      label: "Password",
      type: "password",
      id: "password",
      required: true,
    },

    {
      label: "Country",
      type: "select",
      id: "country",
      options: ["India", "USA", "Canada"],
    },
  ];

  

  formData.forEach(function (field) {
    let fieldHTML = "";
console.log("kk");
    if (field.type === "select") {
      fieldHTML += `<label>${field.label}</label><br>`;
      fieldHTML += `<select id="${field.id}">`;

      field.options.forEach(function (option) {
        fieldHTML += `<option value="${option}">${option}</option>`;
      });

      fieldHTML += `</select><br>`;
    } else {
      fieldHTML += `<label>${field.label}</label><br>`;
      fieldHTML += `<input type="${field.type}" id="${field.id}"><br>`;
      fieldHTML += `<span class="error" id="${field.id}-error"></span>`;
    }

    $("#dynamicForm").append(fieldHTML);
  });

  

  $("#dynamicForm").append(`

<div id="stateDiv">

<label>State</label><br>

<select id="state">
<option value="">Select State</option>
<option>California</option>
<option>Texas</option>
<option>Florida</option>
</select>

<span class="error" id="state-error"></span>

</div>

`);

  // Country change event

  $(document).on("change", "#country", function () {
    let country = $(this).val();

    if (country === "USA") {
      $("#stateDiv").show();
    } else {
      $("#stateDiv").hide();
    }
  });



  $("#submitBtn").click(function () {
    let valid = true;

    // Name validation

    let name = $("#name").val();

    if (name === "") {
      $("#name-error").text("Name is required");
      valid = false;
    } else {
      $("#name-error").text("");
    }

    // Email validation

    let email = $("#email").val();

    if (email === "") {
      $("#email-error").text("Email is required");
      valid = false;
    } else {
      $("#email-error").text("");
    }

    // Password validation

    let password = $("#password").val();

    if (password.length < 6) {
      $("#password-error").text("Password must be at least 6 characters");
      valid = false;
    } else {
      $("#password-error").text("");
    }

    // State validation if USA

    if ($("#country").val() === "USA") {
      if ($("#state").val() === "") {
        $("#state-error").text("Please select a state");
        valid = false;
      } else {
        $("#state-error").text("");
      }
    }

    // Submit success

    if (valid) {
      alert("Form submitted successfully");
    }
  });
});

