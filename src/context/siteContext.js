import React, {useState} from "react";
export const SiteContext = React.createContext();

function SiteProvider({children}){
  let [modal, setModal] = useState(false);
  let [photos, setPhotos] = useState([])

  const values = {
    modal,
    setModal,
    photos,
    setPhotos
  }
return (
  <SiteContext.Provider value={values}>
    {children}
  </SiteContext.Provider> 
)

}

export default SiteProvider;