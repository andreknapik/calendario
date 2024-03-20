import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const faviconLink = document.querySelector("link[rel='icon']");
    // Define o caminho do favicon com base no dia do mês
    faviconLink.href = `favicon${dayOfMonth}.ico`;
  }, []); // Este efeito é executado apenas uma vez ao montar o componente

  // Função para adicionar ou remover uma data da lista de datas selecionadas
  const toggleDateSelection = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const renderDays = (month, year) => {
    const today = new Date();
    
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.toDateString() === today.toDateString();
      const dayText = isToday ? "Hoje" : i;
    
      days.push(
        <div
          key={currentDate.toISOString()}
          className={`day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}`}
          onClick={() => toggleDateSelection(currentDate.toISOString())}
          style={{
            backgroundColor: selectedDates.includes(currentDate.toISOString()) ? 'yellow' : 'white',
          }}
        >
          <div>{dayText}</div>
          {isToday && <div className="today-indicator"> (Hoje)</div>}
        </div>
      );
    }
  
    return days;
  };
  
  // Função para obter o texto do dia de hoje
  const getTodayText = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('pt-BR', options);
  };

  // Função para renderizar o calendário
  const renderCalendar = () => {
    const months = [];

    for (let month = 0; month < 12; month++) {
      months.push(
        <div key={month} className="month">
          <h3>{new Date(2024, month, 1).toLocaleString('default', { month: 'long' })}</h3>
          <div className="days">
            {renderDays(month, 2024)}
          </div>
        </div>
      );
    }

    return months;
  };

  return (
    <div className="App">
      <h1>Calendário</h1>
      <div className="today-text">{getTodayText()}</div>
      <div className="calendar">
        {renderCalendar()}
      </div>
    </div>
  );
}

export default App;
