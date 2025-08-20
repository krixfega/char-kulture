const PlaceholderTab = ({ title, description }) => {
  return (
    <div className="text-center py-16">
      <h2 className="text-xl lg:text-2xl font-playball text-[var(--text-dark)] mb-4">
        {title}
      </h2>
      <p className="text-[var(--text-dark)]/70 font-sans">{description}</p>
    </div>
  );
};

export default PlaceholderTab;