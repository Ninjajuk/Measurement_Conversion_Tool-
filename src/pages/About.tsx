
export default function About() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12 min-h-screen flex flex-col">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About NinjaTool</h1>
        <div className="prose dark:prose-invert mx-auto">
          <p className="text-lg mb-6">
            NinjaTool is a powerful yet simple-to-use  tool that helps you
            Calculate, resize, and enhance your work with just a few clicks.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
          <ul className="space-y-2">
            <li>Calculate Tax and Salary</li>
            <li>Calculate your finanacial goal</li>
            <li>AI Tools</li>
            <li>Compress images without quality loss</li>
            <li>Remove image backgrounds</li>
            <li>Add watermarks to your images</li>
            <li>Much more</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose NinjaTool?</h2>
          <p className="mb-4">
            NinjaTool processes everything in your browser, ensuring your images never leave
            your device. This means faster processing times and complete privacy for your
            files.
          </p>
        </div>
      </div>
    </div>
  );
}
