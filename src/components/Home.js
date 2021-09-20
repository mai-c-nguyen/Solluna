
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
      <img src="../access/home.jpg" width="350" height="240" class="rounded home-image" alt="" />
  </div>
</>;
}
