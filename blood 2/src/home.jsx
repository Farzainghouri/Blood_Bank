import React, {useEffect} from "react";
import { useState } from "react";
import { auth, db } from "./firebaseConfig/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Loader from "./loaders"; // Assuming this is your loader component
import { collection, getDocs, addDoc, query, where, onSnapshot } from "firebase/firestore";

function HomePage() {
  const [showList, setShowList] = useState([]);
  const [storageId, setStorageId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    getUsers();
    const getId = localStorage.getItem("user");
    setStorageId(getId);
  }, []);

  async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "donar"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setShowList(arr);
  }

  function handlechange() {
    window.location.href = "/chat";

  }

  function handlelogout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  function handleDonate() {
    window.location.href = "/donar";
  };



  
  return (
    <div className="h-fit  bg-whitex">
      <nav className="w-full h-20 bg-red-500 flex justify-between items-center px-10">
        <h1 className="font-bold text-2xl">
          Saylani Blood Bank

        </h1>
        

        <h1 className=" p-4 m-2 cursor-pointer text-white rounded-xl  font-bold" onClick={handleDonate}>
          Donat Blood
        </h1>
        <h1 className=" p-4 m-2 cursor-pointer rounded-xl text-white  font-bold" onClick={handlechange}>
          Chat with donar
        </h1>
        <button
          onClick={handlelogout}
          className="bg-red-900 text-white p-4 rounded-xl  font-semibold"
          >
          Logout
        </button>
        
      </nav>
      <div>
        <img src="https://i.gifer.com/QVGh.gif" className="w-full h-80" alt="" />
      </div>
      <h1 className="text-4xl font-bold  text-gray-800 p-10 text-center">BLOOD GROUPS</h1>
      <div className=" flex flex-wrap w-full justify-center items-center py-6 ">
        <div className="w-[31%]">
          <img className="w-80" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHEhEQExASEhEQEA8SDxMNDw8NEQ4QFxEWFxgWFhUYHSggGBolGxYVIjEhJSkrLi46GSAzODMsNygtLisBCgoKDg0OGxAQGi0gICItLS0tLS0tLSstLS0tLS0tLS0tLS0rLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tK//AABEIAQsAvQMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwEDBAUGAgj/xABIEAACAgECAgUIBQcICwAAAAAAAQIDEQQFEiEGBxMxURQiQWFxgZHwFSNSgqEkMjNig7HBFiVTk9HS4fE0QlRkcnSEkpSV0//EABsBAQACAwEBAAAAAAAAAAAAAAADBAECBQYH/8QANREBAAEDAgIGCQMEAwAAAAAAAAECAxEEEiExBRNBUYGxFCJhcZGh0eHwMsHxFSNCUmJjkv/aAAwDAQACEQMRAD8AnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOL1/SxafWwrT+qjmE+ffJtc/w+ckc3Iira6Fvo65XpatRHZyjviOc/ndPsdlGSmk1zT55JHPegAAAAAAAAAAAAAAAAAAAAAAADQdLt5Wz6eUs+fPMa16c+JrXVtjKxo9NVqb0Wo7efsjt/O9B9uuc5tt828t+s58zmcvolFmmiiKaYxEcEwdX2+fSdCrk/rKuXtj4/Pj6i9ar3UvCdKaP0W/NMfpnjH08PLDryRzgAAAAAAAAAAAAAAAAAAAAADzOSgm3yS5tgQn1g799J3ySf1deYwXs738+sp368zjuez6D0XVWutqj1qvLs+PP4OJdnMrvQOk6H73LaboWJ8s4mvQ4/P8SW1XtqcrpXRek2JiP1Rxj6ePnhPemujqIxnF5jJJr2F94FdAAAAAAAAAAAAAAAAAAAAAA5HrB3v6KocIv6y3kvFR9LI7le2lf6N0npN+KZ/THGfp48kHau7jZQfQKYwxchvlf09vAw1qTF1Y795VW9NN+dDnXn0x8Pnw9Zds15jHc8R01o+pvdZTyq8+348/j3JAJnGAAAAAAAAAAAAAAAAAAAAt22KmLlJ4jFNt+pAQN023x7tfOefNTcYL0KK+fwKN2vdU9x0To/R7EZj1quM/tHh55cnKRE67zkM5VTDGW+6N7rLbLa7YvDg171nmjeirbOVHX6WNTZqtz4e/s/O59A7frI7hXCyLypxT/tOi+f1UzTMxPCYZZhgAAAAAAAAAAAAAAAAAAHEdZW9/R1Kpi8Tt78PDUfn+BFer20un0RpOvvxM/pp4z+0fnZEoR1VvGyk9xDHyYbZMgyZBleos4GZYlLvVXvvGpaWT/Wry/ivn1FuxXmMPIdOaTZci9Tyq5+/wC8eUpKJ3CAAAAAAAAAAAAAAAAAC3fatPGU5PEYptv1ID5/6Z7091vssb5ZagvRwr5/cUbte6p7jozS+j2Iiec8Z+nhycrKRG6WVMgyZBkyDKqYMt30e3OW32V2xbTg0+XgbUVbZyq6vTxqLVVue3z7H0NtetjuFULYtNTiny8fSdCJy8BVTNNU01RiY4M0MAAAAAAAAAAAAAAAADh+s3evo+jsYvE7e/1R+f4EV6rbS6XROm66/Ezyp4z+353RKDtVbxspPaRLHyGcmQZMgyZBkyDK9p7OBgmUwdVG99opaaT/AFq/4r59RbsVZjDynTem2XIvRyq5++PrHlKSydw1MgMgVAAAAAAAAAAAADxOagnJvCSbb8Eu9gQB073p7rqLJ581NxgvBL5/ApXat1T2XRen6mxGedXGf2+Xzy4+UiN0svOTBkyDJkGTIMq5MmRMGXQdGN0lt9tdqeOBp+7PP59RtRVtqyq6yxGos1W+/l7+z87n0Vo9VHV1wtj3Tipf2l94aYmJxLH1Wr4OXp8AwseVyh+dGUV4uLS/EDYae7jAyAAAAAAAAAAABynWFvH0VpZJPE7fMj449L+fWaXKttOVvQafr79NM8uc+6PryfP+tt42UXtssTIMmQZMgyZBkyGMvLmZw1mtTtDOGvWMjS38DMYZ3po6tOkCu08qJS86rnD/AIPnHwZbs1Zpx3PK9K2Nl/fHKrj49v18Wbvu4t16nhk1KOj1ck4tqUZKiTTTXcza5+mfcqaWIm/RE/7R5o/6t9ws8ov4rJyj5JbJxlOTTkpww2m+8rWP1vRdNU0Rp4mIiOMdnslK+z7ippcy48q39VymBeAAAAAAAAAAIT61d58q1DrT82lcP3vT8+sq36szh6XoaxttTcnnV5R9/JG1kuJkDs5eMmTJkGTIMmQZeZSDSqp0e2wq2rS16mdFd1upssVMdQnZXCivEZT4E1lym3FZyl2b8TMztjlzU6KJ1N2qndMU045c5mfb7I8z+UP+57f/AODSN8+z4LH9Mtf7Vf8ApclZVvtd8fJ6Kb6qZX0y00ZUq1V87IThlxf1fFJNJNOHrM0zu4TCrqLM6bbXTVMxM4mJ48+U/HzXeju417FRXrJxtsldbdVXCu6FEFXXCtylJuE223bhJY7mSU1bOKpftzqqurziKcTnnPHPthlavp1VbC1LSWRlbRdUpT1kLIw7Stw4uFUrOM5xlGar2YxhHa6K6uumvfymJ5d3i0XRrfI7JZZOVcrI20TqcYWqmSUnF8Sk4y+z4ekjoq2zl0NbZ9Jt7N2OOe90+k6xadJjGjuwvHXQbx/UIl6/2OZPQ/8A2fL7pf0NvnOOcpdz8V3r8Cw4jcw7gPQAAAAAAAGDu2sWgpttbxwQbz6/R+IngzTTNUxEc5fNW96t6iyc33ybl8X3HPmczl7e3RFuiKI7Iw1GQ3yZBkyDJkGVMhjKsK5aiUYQTlObUIRXe5SeEl72ZiFe7cimJmXQ9K5xjf2EHmvR1w0tb+12SxOX3rHZL7wr41e7gk6PpmmxFU86vWnx+2Gr7GfB2vC+z4+Di9HHjPD7cczRc6yndtzx5r20657bdVfjKrnGUo/bh3Sj74tr3mYnE5Q6q3F61VR3x/DO1Gohsk7tBZp69TTVqJ26d2WX1SjGyEOGSlW1lSrVbw/SixOI4ODbiquIrpq2zjE+Deafa9DuGlutjoo1zjpNVapR1Gpn2dldMpx5Slh80u832UzTlU9Lv03tlVXb3Q5/oJoKdzuujbX2ka9Nbaocc605xlBLLg0/9ZkdumJniva3UV27cTROJy77b+iGg1eM6CK/6nVf3ybqqXL/AKhqP9vlCRtDS8uT7288uS9iJFJt4LkB6AAAAAAAA4rrU13kmk4E8OyePcu9fBv4Ed2cUr/RlvfqafZx+HL54QBrJ8bKb1MyxsgyZBkyDJkGRsy1mW76HJVXWauS83Q1TvXEsp35UKF7e1nGXsgzenhx7lDUf3Ji1H+U48O35NY5Z5t59ZHh18uy83yX6MxHtPI/pLOfO8pzx9nj/lOePEl2+pjx/PBw/SJ9M63szs/PFxmSJ3ctzva8r02j1S/OrUtFf3fnVefU37ap8P7Ik50x8HGmOr1FVHf60ePP5um6Cwe4afWaeLip2aXUV18b4YqdlUoxy/QnKXeTW5zTMOb0hTsvU19/7fkPfV/0O1mz33WaiuMIS0tlSxfTbKc5ThjChJvHmvm8GaKZieKLV6ii5REUylXadAoJciVQbuFagBcAAAAAAAAARb1z2v6mHow5e/miC/yh2eho9eufZHn9kL6h8yu7kytZBkyDJkGTIMvMmZhpVLobP5v2+qHdPW3S1E+bT7CriqqTXg5u9/dibVcIiFTT+vfqr7KeEe+ef7MXYND9LammlvEbLErJd3BUvOnL3QUn7jWIzOFvUXurt1V90fwq+kb+kvpHD4fKe04OX6DPD2X9V5hLu45cnqf7O3tx81N/0P0TqbqU8xrsfZy7+Op+dCXvg4v3kUxicOtp73WW6a++P5ZnR78ur1Wj73dV21Cxl+UafNkUvByr7aP3kZo7YV9bw23e6cT7p/IdN1RvtdQ4+iVb/BPBLZ5yodKRm3TPt/PJMVW3rvwWHEbCmrgAvAAAAAAAAAAEYdc1OY0z9sf3sgv8odfoer+5VHs8p+6EtR3ld3JlayGMmQZMgyZBl70unlrbIUwWbLbIVwXjKclGK+LRtEZVr1yKaZmW46WaqGo1M4VvNNChpqPXVTFQT+84uXtkzNXGWNJTNFqM854z4s/ontt2ro19tNbtt7FaaqK4VzueLJc2u6qM4/tEbW6ecq+vvRG2meWcz4Nd/Ifcv9kn/wB9X9422Sj9Lt97Y9K9tu0lGgturddvZS0tsXwv9C8Vyym++qUI/s2a3KeUpNBeiZqpjlnMeLRbXr5bZdVfD8+qyFiWcJuMk8P1PGPeaRwnK9cpiuiaZ7YSl1f6COh3K9V/oeBW6d+h6e+PHX8IzivamT249aXE1lyarNETzzOfDgl6p8iZzFwAAAAAAAAAAAch1l7e9do5tLMq2p+70/uS95HdjNMrmgu9XfpmeU8Pi+d9fXwNlSHpamHky1yZBkyDI2GJlveiX5I9Rrua8jol2T5f6Td9VV3+HFOf7Mkp4cVDUTvmm33z8oaLJoubjKBlTKBlXKBkyDcmXqs1sdbp4zb+u035LPnzdLlKypv42R+4WbU8HC19E03M9k8fqlTR2caJFFlAAAAAAAAAAACzqaVqIShLumnF+8D5w6bbHLab7KmsJNuHg4vuwUq6dtWHqdNf6+1FXbyn3/fm5GS4TCRTIMmQZeZMzDSqW/3L+btDpaO6eqnPW3LHPgWaqI59kbp/tESTwiIUbc7rtVXdw+rV7VoZbndTRD8+6yFaeM4cpJZfqWc+41iMzhNXc20zV3NvunSfhutWno0S08bJRoU9u0VsnVF4g5SlW5SbSTbb72bzMZ4QrW7VVVMTVVOffLF/lRf/AEOh/wDV7f8A/I13Juo/5T8ZZO3dKGra+30+ilR2kO3jDbdDCTq4lx8Mo1qSfDnDT78GYqjthFcs1RTO2qc++Wr3vb5bTqLtPJ5dNk4cX24p+bJeprD95iYxOE9u5voip1HVNunkmsdDfmauuVaXLHbQ8+t/FSj982tziVbXUbree5PW128aRYcdtkBUAAAAAAAAAAAcf0/6LrfquOCXbVpuP6y8Pn+CI7lG6FvR6mbFeeyef57Hz7ueglp5Si4tOLw0+9Mq8uEvRZiqN1M5iWsaDVTIYy8SNoaV8nYdL9h1ut1Vs6dFqLNOuCGknpabNRTPS1wUKnCcE4tOEYvl4slqiZlzrN2imiImePatbTtmo6PQv1moqs08oUW16SOoi6LbNTcuzzCEsNqEJ2TzjCcUYiMcZZuVxdmKKZz3uUiiOV+mHtIwkwytNo3a8YzkZY2uu6V9Ftbra9Jqq9NbbKelrq1CohK6asp8yEpRis+dUq+eO9MmmmcRLl2r9uKqqYnhng0eh6ObnprK7IaDWKddkJ1uWkvilOMk4ttxSXNLvMRTPckrvWppmN0PpLRx858sZecd+G+9Z9XcWHGbaHcB6AAAAAAAAAAAADhenHQaG9p21JQv9K9Fnz8+DjuW4q965pNZVYnE8ae76IR3nYrdvm4ThKElnk1+4qzE0ziXeorou07qJzDS2UOAJhalFmWswpFyh3Nr2NozlFNET2HC5PPe/EZZiiIXa6XM1SxDabbtM9XJRjFyk+5JZY4zwhtM00RuqnEJj6D9Xq0PDdqEnPvhD0L1v5/xsW7W3jPNxdZrpu+pRwp+c/b8l3F+hU/QTOcsw28DP09HABlICoAAAAAAAAAAAAANZvGyUbxHhtrjL14XEveYmInhLe3crtzuonEo63rqoc25UWLH2bO/2Z/zIZsd0unb6Unlcpz7Y4fL+HHa/q81unfOiUvXDmvi8Ec2647FunXaer/LHvj6Za19DtT/AEFnwRjZX3N/SdP/ALwztF0A1mofLTzS8XjH4GYt1z2Natbp6f8ALPuiXW7N1T2Sad9kYr0xh5z+P+RvFjvlVudKRyt0+M/SPqkbY+jOm2RLsq1xfalzkTU0xTycy7euXZzXOW6NkSmAGAGAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=" alt="" />
        </div>
        <div className="w-[31%]">
          <img className="w-80" src="data:image/jpeg;base64,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" alt="" />
        </div>
        <div className="w-[31%]">
          <img className="w-80" src="data:image/jpeg;base64,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" alt="" />
        </div>
        <div className="w-[31%]">
          <img className="w-80" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39iRZMgyS0O3G154g7GNr0ZNlr1LiXAqivg&s" alt="" />
        </div>
        <div className="w-[31%]">
          <img className="w-80" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDFWf4opqLyyNPwW5tEjdcM0p8v9DMKjzmNQ&s" alt="" />
        </div>
        <div className="w-[31%]">
          <img className="w-80" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKPPQ8Y4Ae5XVdhhCgd2C1uZgPr9gSb84XEw&s" alt="" />
        </div>
      </div>


      <div>
        
      <div className="p-6 bg-gray-200  h-fit">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 p-6 text-center">TOP DONATER</h2>
          <div className=" flex flex-wrap text-center">
            {showList.length === 0 ? (
              <p className="text-gray-500 ">No users found.</p>
            ) : (
              showList.map((user, idx) => (
                <div
                  key={idx}
                  className={` w-60 m-2 p-4 h-60 border  ${selectedUser?.uid === user.uid ? "bg-gray-300" : "bg-white"
                    }`}
                  // onClick={() => setSelectedUser(user)} // Select user to chat
                >
                  <div>

                  <div className="text-2xl font-bold">{user.namee}</div>
                  {/* <div className="text-sm text-gray-600">{user.email}</div> */}
                  <div className="text-sm text-gray-600">{user.location}</div>
                  {/* Display phone number and blood group */}
                  <div className="text-sm text-gray-500">Phone: {user.phone || "N/A"}</div>
                  </div>
                  <div className="text-sm text-black my-20">Blood Group: {user.bloodGroup || "N/A"}</div>
                </div>
              
              ))
            )}
          </div>
        </div>

      </div>


      

      <div className="bg-black w-full h-40 text-center text-white py-10">
        Copyright &#169; 2024 | All Rights Reserved | Saylani Blood Bank | By Farzain Ghouri
      </div>
    </div>
  );
}

export default HomePage;
