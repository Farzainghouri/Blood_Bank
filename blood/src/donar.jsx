import React from "react";
import { useState } from "react";
import { auth, db } from "./firebaseConfig/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Loader from "./loaders"; // Assuming this is your loader component
// import { Link, useNavigate } from "react-router-dom";

export default function donate() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [namee, setName] = useState("");
    const [phone, setPhone] = useState(""); // New phone state
    const [bloodGroup, setBloodGroup] = useState("");

    const donarDtail = () => {
        if (email !== "" && password !== "" && namee !== "" && phone !== "" && bloodGroup !== "") {
          setIsLoading(true);
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
              const uid = res.user.uid;
              localStorage.setItem("user", uid);
              const userData = { email, uid, namee, phone, bloodGroup, location }; // Storing phone and blood group
              console.log("User data saved", userData);
              await setDoc(doc(db, "donar", uid), userData);
              setEmail("");
              setPassword("");
              setName("");
              setPhone(""); // Clear the phone input
              setBloodGroup(""); // Clear the blood group input
              // navigate("/home"); // Redirect to home after successful signup
            })
            .catch((error) => {
              alert("Error: " + error.message);
              setIsLoading(false);
            });
        } else {
          alert("Please fill in all fields");
        }
      };

      const handleBack = () => {
        window.location.href = "/home";
      };


    return ( 
      <div className="w-full  bg-red-400 ">
       <button onClick={handleBack}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQwAAAC8CAMAAAC672BgAAAAilBMVEX///8XFxcAAAD5+fkPDw81NTVycnIYGBj8/PwSEhL29vYGBgZubm4aGho0NDSHh4fu7u7j4+M/Pz8oKCg6OjpnZ2fb29tHR0ezs7OOjo56enrCwsIiIiJSUlJhYWGrq6vMzMyfn5+ioqJ4eHjn5+dNTU0tLS3R0dHFxcWDg4Ourq6WlpZiYmK6urqSvG1cAAAGpUlEQVR4nO2c3VIiPRCGk57IJBOiiICiIOiiqMj9397X+ZkBRQ6+Kmc7telnaz1Aq8y8dnfSPxkhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIb5/2jqBeQFy9GhhWY1Es2moV5CFqBFjOaTxcW88eZBvRpaUIvZGGytYNiwq+iVUsZJV8OzqKgXQ0zzDko6I6VUr02xYujoIkuQTkbgrVw38U9+dwOtFCjGrtgAilo0czDygB0WKYYO/68fASWoOzdRL9TroiAeNx9eQX7BTKgXRkKFYuysqb+JcUm9LgrQLDboIuarFlJdUC+MANRijS5S1yFiSKPwa12qGKJ6tp1VGANXjypaRoluMhpAMImowOJDDKBYMba3/tCZxIDbrRBDW5coBoaLlbPJKGpnYDDCz8oUAw+d9xB3VExUpcFE1esztDGAFiUG5mW38dApvaPA6zpWMIoUQ9xJW7eR08B0lD4uTQxf0TvkZegiSu266kVpYsS8rD1duBou94cUtTQxNOZltktQHTxeY4LSfrMoMTBKVjurQuj0/xRc+c7AiRj9ZK366Cs5Gk1g83lUxrGLu68/kcSQF031+zSxYpCJGLiO9QS6dL2Gl+tvf6gkRu0ufp/LyeeDyKkj82xtZxYG7vFvVX1ZXGsZxqhfxiDW7+G5aIF5mamd30K8i7hVKvodkcQwh/Ttt8BTjTM1TKscxEAT2I5jTup8p8jnZafrai2jN2Cfg2noo7zMyZSXnayrdzHsNAcxmncwJuXrtTJP+sdQ1rsYakzaq9PhTOX7ZVKmqh5M3s788AD60KLGgFHHc565oJ148Bawv7EyHjrxYWG6OfezU+gLVYdfTywGmkWFeZlJRy2jYFed9dunQU/8GascxBD6egnG1Sle2MWboJi+uAJqMXTIyxapX4aOa2B51kX65QriCYbQMjBe7NBd20hm7Py8i/QLvRhaXE+P2qhwsxdUWSO9GOJtAofmOixndHkSrRg+XjzJ2CHDbATDxfuIsJhwFS2URgw/gTJMLWVvGRY+SNNnSsvwQ1qTtl9WYy5yuQ0baoGWoTFH/QAlD82AQVwDqWWQiaHn0B6/a6fcs6Ye3yMUQ8zhqAA+fqOf+CWMGXd+AsU3UaUzMNzQa0FlGfjcowt/6gyWgXkZuRAeKjfRYgVtMgI3D3l0KujEmLYFK98vywOimIGnrVQ8kGp+0gyggixmNJO2abbKpmlDJYYWabQTd5L3Jh8xSLZWLXZd3g7LTIIG3da6WYSg4ZtnvoaRg20QZq3PYNoDqLJ+MIdcD0Ixqj9dAwQDx3SThRhEx/FQy2intpy0F+eaRn8PQsvQovK/3Zl2QOdJELsKaaULkzUTLmbGQAqPPzaa/x7UZT8/Gh6HgP1kxGQrKGcjSAvCvtg1uk8Jm/EjjnJFXAOldBNEPzubLtaEsaWRJqt4ZdA3Eesx1N0NNHiZkfRZPTmIITbDo5aaWtyVK4au0C12kDpJoWVwX7CbiHRt1cm4y8o4+1niSIIHH3zzeEhVHCwezm8q//ywSrhSoVR3pyKM7pzhXx9jigfP/WsacHN+7vHzXJFj+O0e+O+Q0YBbZLYE1w2twOTh585r76OPZpzDiLD2g6DtvU1n1e7HINr/hHAWQ7H47B/xOBrmpWsY+ntp3xdWyLh0urHoZDfHM96e3v7od5C+lpkM0gf8XdZueVatTq5/9HnFQkkIVyxyUUOLlenUqB3cN98St34v30z3oexE9fSnrCcH46jhdvbVNHq9llWFwZFcDCO2EYZweJGKNXfiOIz2e2EvN/C5myeljm47Xx2/u66oq5wxR/PToZFQHZ0dvluWGCGpD+/ZaaOotK/77ttliZGo5hCESK6yaw8cJYrhXUVZGfN6jB++kRAoUYxQ5Dh6saGExTp8XqAY8TprcwV+V0mpNTz595cVKIYIpx//pkfr6xsyJCMw2ATLkOWJEdm+gHEpjQqvYxpYV6gYfmC0fQuRl0PJO7QMV6YYIXY8Q3ybRmgkqIUp100868ujemCiVDG0GE1PqsBliuGrC1pg5sZiRHzPbeKvAXepbCkp/E/gkeP6M7VVUpnjkXpNZPhNpdmBORSB4Z56TVToMOUj9jeHOAor6kVRE16x4Y9gmMXO8qlU0qD1O9iFcc7YZUZlWxrQVx7G/kUboNbUa8mC6mN5s3h5y2DWPAN87jZiIRJak80D5gfldfkMYS0YhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEYpif+A7r+XF2/gobDAAAAAElFTkSuQmCC" 
            className="w-16 " alt="" />
          </button>
      <h1 className=" text-4xl font-bold  text-gray-800 p-2 text-center ">
        BLOOD DONATE FORM
      </h1>

        <div className="w-full h-[100vh] bg-red-400 flex items-center justify-center">
      
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-teal-700">Enter details</h2>
        <input
          type="text"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Username"
          value={namee}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="tel"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        />
        <input
          type="text"
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <button
          onClick={donarDtail}
          className="w-full bg-teal-500 text-white py-2 rounded-lg font-bold hover:bg-teal-600"
          >
            SUBMIT
          </button>
          )}
        {/* <div className="mt-4 text-center">
          <Link to="/" className="text-teal-600 hover:underline">
          Already have an account? Login
          </Link>
        </div> */}
      </div>
      </div>
      </div>
        )
}