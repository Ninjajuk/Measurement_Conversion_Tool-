

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="py-2 ">
        <a href="/about" className="px-2 text-sm text-muted-foreground hover:text-primary transition underline">About Us</a>
        <a href="/privacy" className="px-2 text-sm text-muted-foreground hover:text-primary transition underline">Privacy Policy</a>
        <a href="/terms" className="px-2 text-sm text-muted-foreground hover:text-primary transition underline">Terms of Service</a>
        <a href="/contact" className="px-2 text-sm text-muted-foreground hover:text-primary transition underline">Contact Us</a>
      </div>
      <p className="text-sm text-muted-foreground">
          Coded with ♥️ by Samsu
        </p>
      </div>
    </footer>
  );
}
