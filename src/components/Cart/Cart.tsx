import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

  }, [id, navigate]);

  return (
    <div></div>
  )
}

export default Cart;