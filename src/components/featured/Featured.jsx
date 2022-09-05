import {useState, useEffect} from "react";
import { db } from '../../firebase/Firebase.js';
import { collection, onSnapshot } from "firebase/firestore";
import "./featured.css";



const Featured = () => {

  const [london, setLondon] = useState([]);
  const [paris, setParis] = useState([]);
  const [newYork, setNewYork] = useState([]);
  const [accra, setAccra] = useState([]);
  const [kumasi, setKumasi] = useState([]);

  useEffect(() => {
      const ku = onSnapshot(collection(db, "Properties", "Cities", "Kumasi"), (snapshot) => {
        setKumasi(snapshot.docs.map((doc) => doc.data()))
      });

      const lo = onSnapshot(collection(db, "Properties", "Cities", "London"), (snapshot) => {
        setLondon(snapshot.docs.map((doc) => doc.data()))
      });

      const ny = onSnapshot(collection(db, "Properties", "Cities", "New-York"), (snapshot) => {
        setNewYork(snapshot.docs.map((doc) => doc.data()))
      });

      const ac = onSnapshot(collection(db, "Properties", "Cities", "Accra"), (snapshot) => {
        setAccra(snapshot.docs.map((doc) => doc.data()))
      });

      return ku, lo, ny, ac;
  }, []);


  return (
    <div className="featured">
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>New York</h1>
              <h2>{newYork.length} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kumasi</h1>
              <h2>{kumasi.length} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h2>{london.length} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Paris</h1>
              <h2>{paris.length} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Accra</h1>
              <h2>{accra.length} properties</h2>
            </div>
          </div>


        </>
      {/* )} */}
    </div>
  );
};

export default Featured;
