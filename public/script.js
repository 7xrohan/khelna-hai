const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const form = document.getElementById('response-form');
const backBtn = document.getElementById('back-btn');

noBtn.addEventListener('mouseenter', () => {
  const offsetX = Math.random() * 300 - 150;
  const offsetY = Math.random() * 300 - 150;
  noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

yesBtn.addEventListener('click', () => {
  form.style.display = 'flex';
  backBtn.style.display = 'inline-block';
  yesBtn.style.display = 'none';
  noBtn.style.display = 'none';
});

backBtn.addEventListener('click', () => {
  form.style.display = 'none';
  backBtn.style.display = 'none';
  yesBtn.style.display = 'inline-block';
  noBtn.style.display = 'inline-block';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.elements[0].value,
    country: form.elements[1].value,
    reason: form.elements[2].value,
    party: form.elements[3].value,
    phone: form.elements[4].value
  };

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      // ✅ Saved on backend, now open WhatsApp
      const message = `Arey suno! 😈\n\nNaam: ${data.name}\nDesh: ${data.country}\nKyun: ${data.reason}\nVote: ${data.party}\nCall me maybe: ${data.phone}`;
      const encodedMessage = encodeURIComponent(message);
      const number = '918669592883'; // <== Replace with your target WhatsApp number (with country code)
      const whatsappLink = `https://wa.me/${number}?text=${encodedMessage}`;

      window.location.href = whatsappLink;
    } else {
      alert('Backend save failed.');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong!');
  }
});
