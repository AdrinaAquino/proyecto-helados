import React, { useState } from "react";

export default function MostrarContraseña() {
  const [mostrar, setMostrar] = useState(false);
  const toggleMostrar = () => setMostrar(!mostrar);

  return { mostrar, toggleMostrar };
}
