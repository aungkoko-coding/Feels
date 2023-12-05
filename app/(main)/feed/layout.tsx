const FeedLayout = ({
  children,
  play_modal,
}: {
  children: React.ReactNode;
  play_modal: React.ReactNode;
}) => {
  return (
    <section>
      {children}
      {play_modal}
    </section>
  );
};

export default FeedLayout;
