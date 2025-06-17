import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-semibold text-primary">
            <Link to="/">PitchPilot</Link>
          </div>

          {/* Right Buttons */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Button variant="ghost" className="text-gray-600 hover:text-primary">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-gray-600 hover:text-primary">
                  <Link to="/results">Results</Link>
                </Button>
                <span className="text-sm font-medium text-gray-700">
                  {user.displayName || user.email}
                </span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-sm border-gray-400 hover:bg-gray-100"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
