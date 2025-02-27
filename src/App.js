// Import icons from Lucide
const { PlusCircle, ChevronDown, ChevronUp, Trash2, Save, FileText } = lucide;

// Main App Component
function WeddingVenueMeetingManager() {
  // State for meetings
  const [meetings, setMeetings] = React.useState(() => {
    const savedMeetings = localStorage.getItem('weddingVenueMeetings');
    return savedMeetings ? JSON.parse(savedMeetings) : [];
  });
  
  // State for currently selected meeting
  const [currentMeetingId, setCurrentMeetingId] = React.useState(null);
  
  // State for new question form
  const [newQuestionText, setNewQuestionText] = React.useState('');
  const [newQuestionCategory, setNewQuestionCategory] = React.useState('General');
  
  // Default question categories and questions
  const defaultCategories = [
    {
      name: 'Availability & Scheduling',
      questions: [
        { id: '1', text: 'Is our preferred date available?', asked: false, answer: '' },
        { id: '2', text: 'What time can the venue be accessed for setup?', asked: false, answer: '' },
        { id: '3', text: 'What is the end time for the event?', asked: false, answer: '' },
      ]
    },
    {
      name: 'Pricing & Packages',
      questions: [
        { id: '4', text: 'What is the base cost for our date and time?', asked: false, answer: '' },
        { id: '5', text: 'Are there any seasonal discounts available?', asked: false, answer: '' },
        { id: '6', text: 'What is included in the base package?', asked: false, answer: '' },
        { id: '7', text: 'Are tables, chairs, and linens included?', asked: false, answer: '' },
      ]
    },
    {
      name: 'Catering & Bar',
      questions: [
        { id: '8', text: 'Is in-house catering required or can we bring outside vendors?', asked: false, answer: '' },
        { id: '9', text: 'What are the alcohol policies?', asked: false, answer: '' },
        { id: '10', text: 'Are there bar service fees or minimums?', asked: false, answer: '' },
      ]
    },
    {
      name: 'Logistics & Space',
      questions: [
        { id: '11', text: 'How many guests can the venue accommodate?', asked: false, answer: '' },
        { id: '12', text: 'Is there a separate space for ceremony and reception?', asked: false, answer: '' },
        { id: '13', text: 'Is there a designated space for cocktail hour?', asked: false, answer: '' },
        { id: '14', text: 'Is there a bridal suite or getting ready room?', asked: false, answer: '' },
      ]
    },
    {
      name: 'Policies & Restrictions',
      questions: [
        { id: '15', text: 'What are the noise restrictions?', asked: false, answer: '' },
        { id: '16', text: 'Are there decoration restrictions?', asked: false, answer: '' },
        { id: '17', text: 'Are candles or open flames allowed?', asked: false, answer: '' },
        { id: '18', text: 'Is there a preferred vendor list we must use?', asked: false, answer: '' },
      ]
    },
    {
      name: 'General',
      questions: [
        { id: '19', text: 'Is parking available for guests?', asked: false, answer: '' },
        { id: '20', text: 'Is the venue ADA accessible?', asked: false, answer: '' },
        { id: '21', text: 'What happens in case of inclement weather?', asked: false, answer: '' },
      ]
    }
  ];

  // Save meetings to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('weddingVenueMeetings', JSON.stringify(meetings));
  }, [meetings]);

  // Create a new meeting
  const createNewMeeting = () => {
    const newId = Date.now().toString();
    const newMeeting = {
      id: newId,
      venueName: 'New Venue',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      categories: JSON.parse(JSON.stringify(defaultCategories)) // Deep copy
    };
    
    setMeetings([...meetings, newMeeting]);
    setCurrentMeetingId(newId);
  };

  // Get current meeting
  const currentMeeting = meetings.find(m => m.id === currentMeetingId);

  // Toggle expanded state for a category
  const [expandedCategories, setExpandedCategories] = React.useState({});
  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Handle checkbox change
  const handleQuestionAsked = (categoryIndex, questionIndex, checked) => {
    const updatedMeetings = [...meetings];
    const meetingIndex = updatedMeetings.findIndex(m => m.id === currentMeetingId);
    updatedMeetings[meetingIndex].categories[categoryIndex].questions[questionIndex].asked = checked;
    setMeetings(updatedMeetings);
  };

  // Handle answer change
  const handleAnswerChange = (categoryIndex, questionIndex, answer) => {
    const updatedMeetings = [...meetings];
    const meetingIndex = updatedMeetings.findIndex(m => m.id === currentMeetingId);
    updatedMeetings[meetingIndex].categories[categoryIndex].questions[questionIndex].answer = answer;
    setMeetings(updatedMeetings);
  };

  // Update meeting venue name
  const updateVenueName = (name) => {
    const updatedMeetings = [...meetings];
    const meetingIndex = updatedMeetings.findIndex(m => m.id === currentMeetingId);
    updatedMeetings[meetingIndex].venueName = name;
    setMeetings(updatedMeetings);
  };

  // Update meeting date
  const updateMeetingDate = (date) => {
    const updatedMeetings = [...meetings];
    const meetingIndex = updatedMeetings.findIndex(m => m.id === currentMeetingId);
    updatedMeetings[meetingIndex].date = date;
    setMeetings(updatedMeetings);
  };

  // Update meeting notes
  const updateMeetingNotes = (notes) => {
    const updatedMeetings = [...meetings];
    const meetingIndex = updatedMeetings.findIndex(m => m.id === currentMeetingId);
    updatedMeetings[meetingIndex].notes = notes;
    setMeetings(updatedMeetings);
  };

  // Add a new question
  const addNewQuestion = () => {
    if (!newQuestionText.trim()) return;
    
    const updatedMeetings = [...meetings];
    const meetingIndex = updatedMeetings.findIndex(m => m.id === currentMeetingId);
    const categoryIndex = updatedMeetings[meetingIndex].categories.findIndex(
      c => c.name === newQuestionCategory
    );
    
    if (categoryIndex === -1) {
      // Create new category if it doesn't exist
      updatedMeetings[meetingIndex].categories.push({
        name: newQuestionCategory,
        questions: [{
          id: Date.now().toString(),
          text: newQuestionText,
          asked: false,
          answer: ''
        }]
      });
    } else {
      // Add to existing category
      updatedMeetings[meetingIndex].categories[categoryIndex].questions.push({
        id: Date.now().toString(),
        text: newQuestionText,
        asked: false,
        answer: ''
      });
    }
    
    setMeetings(updatedMeetings);
    setNewQuestionText('');
    
    // Expand the category where the question was added
    setExpandedCategories(prev => ({
      ...prev,
      [newQuestionCategory]: true
    }));
  };

  // Delete a meeting
  const deleteMeeting = (meetingId) => {
    if (confirm('Are you sure you want to delete this meeting?')) {
      const updatedMeetings = meetings.filter(m => m.id !== meetingId);
      setMeetings(updatedMeetings);
      if (currentMeetingId === meetingId) {
        setCurrentMeetingId(updatedMeetings.length > 0 ? updatedMeetings[0].id : null);
      }
    }
  };

  // Render meeting list view
  if (!currentMeetingId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Wedding Venue Meeting Manager</h1>
          <p className="text-gray-600">Manage and track your venue meetings in one place</p>
        </header>
        
        <div className="mb-6">
          <button 
            onClick={createNewMeeting}
            className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            <PlusCircle className="mr-2" size={18} />
            Start New Meeting
          </button>
        </div>
        
        {meetings.length === 0 ? (
          <div className="text-center p-10 bg-white rounded shadow">
            <p className="text-gray-600 mb-4">No meetings yet. Click the button above to create your first meeting.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meetings.map(meeting => (
              <div key={meeting.id} className="bg-white rounded shadow p-4 transition hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{meeting.venueName}</h2>
                  <button 
                    onClick={() => deleteMeeting(meeting.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{meeting.date}</p>
                <div className="text-sm text-gray-500 mb-4">
                  {meeting.categories.reduce((total, cat) => 
                    total + cat.questions.filter(q => q.asked).length, 0)} / {
                    meeting.categories.reduce((total, cat) => 
                      total + cat.questions.length, 0)} questions asked
                </div>
                <button 
                  onClick={() => setCurrentMeetingId(meeting.id)}
                  className="flex items-center justify-center w-full bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition"
                >
                  <FileText className="mr-2" size={16} />
                  Open Meeting
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render meeting detail view
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <button 
            onClick={() => setCurrentMeetingId(null)}
            className="text-gray-600 hover:text-gray-800 mb-2"
          >
            ← Back to meetings
          </button>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={currentMeeting.venueName}
              onChange={e => updateVenueName(e.target.value)}
              className="text-2xl font-bold border-0 border-b-2 border-gray-200 focus:border-purple-500 focus:ring-0 bg-transparent"
            />
            <input
              type="date"
              value={currentMeeting.date}
              onChange={e => updateMeetingDate(e.target.value)}
              className="border border-gray-300 rounded p-1"
            />
          </div>
        </div>
        <div>
          <button 
            onClick={() => deleteMeeting(currentMeeting.id)}
            className="text-red-500 hover:text-red-700 p-2"
            title="Delete meeting"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </header>
      
      {/* Add Question Form */}
      <div className="bg-white rounded shadow mb-6 p-4">
        <h2 className="text-lg font-medium mb-2">Add a new question</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="text"
            value={newQuestionText}
            onChange={e => setNewQuestionText(e.target.value)}
            placeholder="Enter your question"
            className="flex-1 border border-gray-300 rounded p-2"
          />
          <div className="flex space-x-2">
            <select
              value={newQuestionCategory}
              onChange={e => setNewQuestionCategory(e.target.value)}
              className="border border-gray-300 rounded p-2"
            >
              {currentMeeting.categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
              <option value="Other">Other (New Category)</option>
            </select>
            <button 
              onClick={addNewQuestion}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex items-center"
            >
              <PlusCircle className="mr-1" size={16} />
              Add
            </button>
          </div>
        </div>
        {newQuestionCategory === 'Other' && (
          <input
            type="text"
            value={newQuestionCategory === 'Other' ? '' : newQuestionCategory}
            onChange={e => setNewQuestionCategory(e.target.value)}
            placeholder="Enter new category name"
            className="mt-2 border border-gray-300 rounded p-2 w-full"
          />
        )}
      </div>
      
      {/* Meeting Notes */}
      <div className="bg-white rounded shadow mb-6 p-4">
        <h2 className="text-lg font-medium mb-2">Meeting Notes</h2>
        <textarea
          value={currentMeeting.notes}
          onChange={e => updateMeetingNotes(e.target.value)}
          placeholder="Write your general notes here..."
          className="w-full min-h-32 border border-gray-300 rounded p-2"
          rows={6}
        />
      </div>
      
      {/* Question Categories */}
      <div className="space-y-4">
        {currentMeeting.categories.map((category, categoryIndex) => (
          <div key={category.name} className="bg-white rounded shadow">
            <div 
              className="p-4 border-b cursor-pointer flex justify-between items-center"
              onClick={() => toggleCategory(category.name)}
            >
              <h2 className="text-lg font-medium">
                {category.name} 
                <span className="ml-2 text-sm text-gray-500">
                  ({category.questions.filter(q => q.asked).length}/{category.questions.length})
                </span>
              </h2>
              {expandedCategories[category.name] ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </div>
            
            {expandedCategories[category.name] && (
              <div className="p-4">
                {category.questions.length === 0 ? (
                  <p className="text-gray-500 italic">No questions in this category yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {category.questions.map((question, questionIndex) => (
                      <li key={question.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={question.asked}
                            onChange={e => handleQuestionAsked(categoryIndex, questionIndex, e.target.checked)}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <p className={`${question.asked ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {question.text}
                            </p>
                            <textarea
                              value={question.answer}
                              onChange={e => handleAnswerChange(categoryIndex, questionIndex, e.target.value)}
                              placeholder="Enter answer here..."
                              className="mt-2 w-full border border-gray-300 rounded p-2"
                              rows={2}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
