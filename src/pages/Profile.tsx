import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, MapPin, Calendar, Edit, LogOut, Settings, ShoppingBag, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: '',
    location: ''
  });
  
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        location: profile.location || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!profile) return;
    
    const { error } = await updateProfile({
      display_name: formData.display_name,
      location: formData.location
    });

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || '',
        location: profile.location || ''
      });
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20 md:pb-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="bg-gradient-card shadow-medium border-border mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src={profile.avatar_url || ''} alt={profile.display_name || 'User'} />
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {(profile.display_name || user.email || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Badge 
                  variant="default" 
                  className="absolute -bottom-1 -right-1 h-6 w-6 p-0 rounded-full flex items-center justify-center bg-success"
                >
                  ✓
                </Badge>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="Display Name"
                      value={formData.display_name}
                      onChange={(e) => handleInputChange('display_name', e.target.value)}
                      className="max-w-sm"
                    />
                    <Input
                      placeholder="Location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">
                        {profile.display_name || user.email}
                      </h1>
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-1 text-muted-foreground mb-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    {profile.location && (
                      <div className="flex items-center justify-center md:justify-start space-x-1 text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-center md:justify-start space-x-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">Member since {new Date(profile.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-center md:justify-start space-x-3 mt-4">
                  {isEditing ? (
                    <>
                      <Button variant="default" size="sm" onClick={handleSave}>
                        Save Changes
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Settings
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5.0</div>
                <div className="text-sm text-muted-foreground">Rating</div>
                <div className="flex space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className="text-lg text-warning"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-soft border-border hover:shadow-medium transition-smooth">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Items Sold</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-border hover:shadow-medium transition-smooth">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-success/20 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Purchases</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-soft border-border hover:shadow-medium transition-smooth">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-destructive/20 rounded-lg">
                  <Heart className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Favorites</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card shadow-soft border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            <CardDescription>Manage your EcoFinds experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/my-listings">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Manage My Listings
                </Button>
              </Link>
              <Link to="/purchases">
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  View Purchase History
                </Button>
              </Link>
              <Link to="/favorites">
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  My Favorites
                </Button>
              </Link>
              <Link to="/add-product">
                <Button variant="default" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Sell New Item
                </Button>
              </Link>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1 justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1 justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;