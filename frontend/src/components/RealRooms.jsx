const RealRooms = () => (
  <section className="border-b-[3px] border-foreground">
    <div className="mx-auto grid max-w-[1500px] lg:grid-cols-2">
      <div className="relative border-b-[3px] border-foreground lg:border-b-0 lg:border-r-[3px]">
        <img
          src="/images/life-shelf.jpg"
          alt="Cream living room shelf styled with red and blue 3D-printed vases and objects"
          loading="lazy"
          width={1504}
          height={1008}
          className="h-full w-full object-cover"
        />
        <span className="sticker absolute left-6 top-6 -rotate-3 bg-background text-foreground">
          Shot in a real home
        </span>
      </div>
      <div className="grid grid-rows-[auto_1fr]">
        <div className="border-b-[3px] border-foreground px-6 py-14 sm:px-10">
          <h2 className="display-xl text-[3rem] sm:text-[4.5rem]">
            Looks better
            <br />
            <span className="underline-scribble">in real rooms</span>
          </h2>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            No floating studio fantasy — actual homes, actual desks, actual mess just out of frame. Tag{' '}
            <span className="font-black text-foreground">#MadeWeird</span> and we'll put you here.
          </p>
        </div>
        <img
          src="/images/life-desk.jpg"
          alt="Gen-Z desk setup with red and blue 3D-printed desk accessories"
          loading="lazy"
          width={1200}
          height={1504}
          className="h-full max-h-[560px] w-full object-cover"
        />
      </div>
    </div>
  </section>
);

export default RealRooms;
