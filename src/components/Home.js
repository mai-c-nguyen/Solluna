
export default function Home() {
  return <>
    <div className="home-layout">
      <div>
      <h1>Organic and aromatic tea and roses from northern mountains.</h1>
      <p>
        Order your herbs from <em>Solluna</em>, the selected collections,
        and get your products delivered straight to your doorstep.
      </p>
      <a to="/products" class="btn btn-default">
        Start shopping
      </a>
      </div>
      <img src="https://images.unsplash.com/photo-1610967911716-d1af934d4f6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" width="350" height="240" class="rounded home-image" alt="" />
  </div>
</>;
}
