
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  useCurrentAccount, 
  useCurrentWallet, 
  useIotaClient,
  ConnectButton
} from "@iota/dapp-kit";
import { 
  Shield, 
  Lock, 
  Eye, 
  Users,
  Activity,
  Zap,
  Globe,
  Search,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  Star,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  Brain,
  Award
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import RoleSelectionModal from "@/components/RoleSelectionModal";

const Index = () => {
  const [userRole, setUserRole] = useState<string>("");
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { toast } = useToast();
  const currentAccount = useCurrentAccount();
  const { currentWallet, connectionStatus } = useCurrentWallet();

  // Available roles for demo
  const availableRoles = ["client", "analyst", "certifier"];

  // Show role selection when wallet connects
  useEffect(() => {
    if (connectionStatus === 'connected' && currentAccount && !userRole) {
      toast({
        title: "Wallet Connected Successfully",
        description: `Connected to ${currentWallet?.name || 'IOTA Wallet'}`,
      });
      setShowRoleSelection(true);
    }
  }, [connectionStatus, currentAccount, currentWallet, userRole, toast]);

  const handleRoleSelection = (role: string) => {
    setUserRole(role);
    setShowRoleSelection(false);
    setShowDashboard(true);

    toast({
      title: "Role Selected",
      description: `Welcome, ${role}! You can now access the platform.`,
    });
  };

  // Live data for different sections
  const liveData = {
    analysts: [
      { name: "Dr. Sarah Chen", specialization: "Malware Analysis", cases: 47, rating: 4.9, status: "online", country: "🇺🇸 USA" },
      { name: "Alex Rodriguez", specialization: "Network Security", cases: 32, rating: 4.8, status: "online", country: "🇪🇸 Spain" },
      { name: "Prof. Michael Kim", specialization: "Forensics", cases: 68, rating: 4.95, status: "busy", country: "🇰🇷 Korea" },
      { name: "Dr. Emma Watson", specialization: "APT Research", cases: 23, rating: 4.7, status: "online", country: "🇬🇧 UK" },
      { name: "Viktor Petrov", specialization: "Cryptanalysis", cases: 41, rating: 4.85, status: "away", country: "🇷🇺 Russia" }
    ],
    cases: [
      { id: "INC-2024-001", title: "Advanced Persistent Threat Detection", severity: "Critical", analyst: "Dr. Sarah Chen", progress: 85, timeLeft: "2h" },
      { id: "INC-2024-002", title: "Ransomware Family Analysis", severity: "High", analyst: "Alex Rodriguez", progress: 45, timeLeft: "6h" },
      { id: "INC-2024-003", title: "Zero-Day Exploit Investigation", severity: "Critical", analyst: "Prof. Michael Kim", progress: 92, timeLeft: "30m" },
      { id: "INC-2024-004", title: "Phishing Campaign Analysis", severity: "Medium", analyst: "Dr. Emma Watson", progress: 67, timeLeft: "4h" },
      { id: "INC-2024-005", title: "IoT Botnet Research", severity: "High", analyst: "Viktor Petrov", progress: 15, timeLeft: "12h" }
    ],
    education: [
      { title: "Advanced Malware Analysis", instructor: "CyberSec Institute", students: 234, rating: 4.8, duration: "8 weeks" },
      { title: "Digital Forensics Masterclass", instructor: "SecureLearn", students: 189, rating: 4.9, duration: "6 weeks" },
      { title: "Threat Hunting Techniques", instructor: "ThreatAcademy", students: 156, rating: 4.7, duration: "4 weeks" },
      { title: "Incident Response Bootcamp", instructor: "CyberDefense Pro", students: 298, rating: 4.85, duration: "10 weeks" }
    ],
    scienceTech: [
      { title: "AI-Powered Threat Detection", category: "Machine Learning", engagement: "1.2k", trending: true },
      { title: "Quantum Cryptography Advances", category: "Cryptography", engagement: "856", trending: true },
      { title: "5G Security Vulnerabilities", category: "Network Security", engagement: "743", trending: false },
      { title: "Blockchain for Cybersecurity", category: "Distributed Systems", engagement: "692", trending: true }
    ]
  };

  // Recent activity with more dynamic data
  const recentActivity = [
    { user: "Dr. Sarah Chen", action: "completed critical APT analysis", time: "1m ago", type: "success" },
    { user: "Alex Rodriguez", action: "identified new ransomware variant", time: "3m ago", type: "alert" },
    { user: "Prof. Michael Kim", action: "published threat intelligence report", time: "8m ago", type: "info" },
    { user: "Emma Watson", action: "earned 75 CLT tokens", time: "15m ago", type: "reward" },
    { user: "Viktor Petrov", action: "escalated zero-day finding", time: "22m ago", type: "critical" }
  ];

  if (showDashboard && userRole && currentAccount) {
    return <Dashboard userRole={userRole} walletAddress={currentAccount.address} onBack={() => setShowDashboard(false)} />;
  }

  const renderSectionContent = () => {
    switch (activeSection) {
      case "analysts":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Security Analysts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveData.analysts.map((analyst, index) => (
                <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{analyst.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{analyst.name}</h3>
                          <p className="text-sm text-white/60">{analyst.specialization}</p>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        analyst.status === 'online' ? 'bg-green-400' : 
                        analyst.status === 'busy' ? 'bg-red-400' : 'bg-yellow-400'
                      }`}></div>
                    </div>
                    <div className="flex justify-between text-sm text-white/80">
                      <span>{analyst.country}</span>
                      <span>{analyst.cases} cases</span>
                      <span>★ {analyst.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "cases":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Active Security Cases</h2>
            <div className="space-y-4">
              {liveData.cases.map((case_, index) => (
                <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{case_.title}</h3>
                        <p className="text-sm text-white/60">ID: {case_.id} • Analyst: {case_.analyst}</p>
                      </div>
                      <Badge className={`${
                        case_.severity === 'Critical' ? 'bg-red-500' :
                        case_.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}>
                        {case_.severity}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-white/80">
                        <span>Progress: {case_.progress}%</span>
                        <span>ETA: {case_.timeLeft}</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${case_.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Cybersecurity Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveData.education.map((course, index) => (
                <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{course.title}</h3>
                        <p className="text-sm text-white/60 mb-2">{course.instructor}</p>
                        <div className="flex justify-between text-sm text-white/80">
                          <span>{course.students} students</span>
                          <span>★ {course.rating}</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "science":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Science & Technology</h2>
            <div className="space-y-4">
              {liveData.scienceTech.map((topic, index) => (
                <Card key={index} className="bg-black/40 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{topic.title}</h3>
                          <p className="text-sm text-white/60">{topic.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {topic.trending && <Badge className="bg-pink-500">Trending</Badge>}
                        <span className="text-sm text-white/80">{topic.engagement}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Content */}
            <div className="lg:col-span-2">
              {/* Hero Banner */}
              <Card className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 border-0 text-white">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-2">Find Your Community on dSOC</h2>
                  <p className="text-white/90 mb-4">Join security analysts, researchers, and professionals in decentralized threat intelligence</p>
                  <div className="flex space-x-4">
                    {connectionStatus === 'connected' ? (
                      <Button 
                        onClick={() => setShowRoleSelection(true)}
                        className="bg-white text-purple-600 hover:bg-white/90"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    ) : (
                      <ConnectButton
                        connectText="Connect IOTA Wallet"
                        className="bg-white text-purple-600 hover:bg-white/90"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Communities */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-4">Featured Communities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Shield className="w-6 h-6" />
                        <div>
                          <h4 className="font-bold">Malware Analysis</h4>
                          <p className="text-sm text-white/80">Advanced threat detection and analysis</p>
                        </div>
                      </div>
                      <p className="text-sm text-white/70">1.2k analysts</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 border-0 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Zap className="w-6 h-6" />
                        <div>
                          <h4 className="font-bold">Incident Response</h4>
                          <p className="text-sm text-white/80">Real-time security incident handling</p>
                        </div>
                      </div>
                      <p className="text-sm text-white/70">843 active cases</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Popular Right Now */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-4">Popular Right Now</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Threat Intel</h4>
                          <p className="text-sm text-white/60">Latest IOCs and threat signatures</p>
                          <Badge variant="secondary" className="mt-1 text-xs">Intelligence</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Security Reports</h4>
                          <p className="text-sm text-white/60">Comprehensive analysis reports</p>
                          <Badge variant="secondary" className="mt-1 text-xs">Reports</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Sidebar - Recent Activity */}
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'alert' ? 'bg-orange-500' :
                        activity.type === 'critical' ? 'bg-red-500' :
                        activity.type === 'reward' ? 'bg-purple-500' :
                        'bg-blue-500'
                      }`}>
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-white/50">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection Status */}
              {currentAccount && (
                <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-white mb-2">Connected Wallet</h4>
                    <p className="text-sm text-white/60 break-all">
                      {currentAccount.address.slice(0, 8)}...{currentAccount.address.slice(-6)}
                    </p>
                    <Badge className="mt-2 bg-green-500/20 text-green-300">Connected</Badge>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Role Selection Modal */}
      <RoleSelectionModal 
        isOpen={showRoleSelection}
        onClose={() => setShowRoleSelection(false)}
        onSelectRole={handleRoleSelection}
        availableRoles={availableRoles}
      />

      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">dSOC Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/10 backdrop-blur-xl bg-black/20 min-h-screen p-6">
          <nav className="space-y-2">
            <div 
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                activeSection === 'home' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/60'
              }`}
              onClick={() => setActiveSection('home')}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="font-medium">Home</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                activeSection === 'analysts' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/60'
              }`}
              onClick={() => setActiveSection('analysts')}
            >
              <Users className="w-4 h-4" />
              <span>Analysts</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                activeSection === 'cases' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/60'
              }`}
              onClick={() => setActiveSection('cases')}
            >
              <Activity className="w-4 h-4" />
              <span>Cases</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                activeSection === 'education' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/60'
              }`}
              onClick={() => setActiveSection('education')}
            >
              <Globe className="w-4 h-4" />
              <span>Education</span>
            </div>
            <div 
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                activeSection === 'science' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/10 text-white/60'
              }`}
              onClick={() => setActiveSection('science')}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Science & Tech</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 text-white/60 cursor-pointer">
              <Zap className="w-4 h-4" />
              <span>Entertainment</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 text-white/60 cursor-pointer">
              <Star className="w-4 h-4" />
              <span>Student Hub</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
