import qrCodeImage from "C:/Users/sanke/OneDrive/Desktop/Tech Horizon/TrustBridge/src/assets/QrCode.jpeg"; // Ensure your image is in "src/assets" folder

const PaymentQRCode = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        {/* Razorpay Branding */}
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Powered by <span className="text-blue-600">Razorpay</span>
        </h2>

        {/* QR Code Section */}
        <div className="border rounded-xl p-4 mt-3 bg-gray-50">
          <img src={qrCodeImage} alt="Payment QR Code" className="w-full rounded-lg" />
          <p className="text-sm text-gray-600 mt-2">Scan & Pay with any UPI App</p>
        </div>

        {/* Payment Options */}
        <div className="flex justify-center gap-4 mt-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Google_Pay_%28GPay%29_Logo.svg/512px-Google_Pay_%28GPay%29_Logo.svg.png"
            alt="GPay"
            className="w-10"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png"
            alt="PhonePe"
            className="w-10"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Paytm_Logo.svg/512px-Paytm_Logo.svg.png"
            alt="Paytm"
            className="w-10"
          />
        </div>

        {/* Name Display */}
        <h3 className="text-lg font-semibold text-gray-800 mt-4">
          KAMALESHWAR VENKATESH VIYANWAR
        </h3>
      </div>
    </div>
  );
};

export default PaymentQRCode;