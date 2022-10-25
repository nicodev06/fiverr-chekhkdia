<template>
    <div>
        <Navbar/>
        <main>
            <div class="container">
                <h2>Create Event</h2>
                <form>
                    <label for="nameInput" class="form-label">Name</label>
                    <input type="text" name="name" id="nameInput" class="form-control">
                    <label for="dateInput" class="form-label">Date</label>
                    <input type="date" name="date" id="dateInput" class="form-control">
                    <label for="timeInput" class="form-label">Time</label>
                    <input type="time" name="time" id="timeInput" class="form-control">
                    <label for="locationInput" class="form-label">Location</label>
                    <input type="text" name="Location" class="form-control">
                    <button class="btn btn-sm btn-success my-3">Submit</button>
                </form>
            </div>
        </main>
        <Footer/>
    </div>
</template>