import React, {useState} from "react";
export const SiteContext = React.createContext();

function SiteProvider({children}){
  let [modal, setModal] = useState(false);


const values = {
  modal,
  setModal
}

return (
  <SiteContext.Provider value={values}>
    {children}
  </SiteContext.Provider> 
)

}

export default SiteProvider;