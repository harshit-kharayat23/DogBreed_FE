import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { User, Settings, LogOut } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.loggedInUser);

  const handleLogOut = async () => {
    try {
      await axios.get(import.meta.env.VITE_BASE_URL + "/logout", { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white text-black shadow-md py-3 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <h1 className="text-3xl font-bold hover:text-gray-700 transition cursor-pointer select-none">
          Bark <span className="text-[#F83002]">NET</span>
        </h1>
      </div>

      {!user ? (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Sign Up</Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-6">
        <Button variant="link" asChild>
            <Link to="/body" className="font-bold text-xl">
              Home
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/predictor" className="font-bold text-xl text-blue-600">
              Disease Predictor
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/qrGenerator" className="font-bold text-xl text-blue-600">
              QR Generator
            </Link>
          </Button>

          <p className="font-semibold">Welcome! {user?.firstName}</p>

          <div className="relative group">
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                    src={
                      user?.photoUrl ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="user photo"
                  />
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="bg-white rounded-md shadow-lg p-2 w-40">
                <ul>
                  <li>
                    <Button variant="link" className="w-full justify-start" asChild>
                      <Link to="/profile" className="flex items-center gap-2 py-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="w-full justify-start flex items-center gap-2 py-2">
                      <Settings className="w-4 h-4" />
                       <Link to="/body" className="flex items-center gap-2 py-2">
                        
                        Home
                      </Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="link"
                      onClick={handleLogOut}
                      className="w-full justify-start flex items-center gap-2 py-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
