const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();


    if (!name || !studentId || !email || !contact) {
        alert("Please fill all fields");
        return;
    }


    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Student name should contain only characters");
        return;
    }

    // Student ID validation

    if (!/^[0-9]+$/.test(studentId)) {
        alert("Student ID should contain only numbers");
        return;
    }

    // Email validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email");
        return;
    }

    // Contact validation

    if (!/^[0-9]{10,}$/.test(contact)) {
        alert("Contact number must contain at least 10 digits");
        return;
    }

    const student = {
        id: Date.now(),
        name,
        studentId,
        email,
        contact
    };

    students.push(student);

    saveStudents();

    displayStudents();

    form.reset();
});

function displayStudents() {

    studentList.innerHTML = "";

    students.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>

            <td>
                <div class="action-buttons">

                    <button class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                    </button>

                    <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                    </button>

                </div>
            </td>
        `;

        studentList.appendChild(row);
    });

    // Dynamic scrollbar

    const tableContainer =
        document.querySelector(".table-container");

    if (students.length > 5) {
        tableContainer.style.overflowY = "auto";
    } else {
        tableContainer.style.overflowY = "hidden";
    }
}

function editStudent(id) {

    const student =
        students.find(student => student.id === id);

    document.getElementById("name").value =
        student.name;

    document.getElementById("studentId").value =
        student.studentId;

    document.getElementById("email").value =
        student.email;

    document.getElementById("contact").value =
        student.contact;

    students = students.filter(student =>
        student.id !== id);

    saveStudents();

    displayStudents();
}

function deleteStudent(id) {

    if (confirm("Are you sure you want to delete this student?")) {

        students = students.filter(student =>
            student.id !== id);

        saveStudents();

        displayStudents();
    }
}

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}