const form = document.getElementById('form');
const hiddenCard = document.getElementById('hiddenCard');
const urlInp = document.getElementById('urlInp');
const shortUrl = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInp.value;

    if (!url) {
        return M.toast({
            html: 'Please Enter Url',
        });
    }

    try {
        const res = await axios.post('/api/url/shorten', {
            url,
        });

        shortUrl.value = res.data.shortUrl;
        hiddenCard.classList.remove('hide');
    } catch (err) {
        M.toast({
            html: err.response.data.message,
        });
    }
});

copyBtn.addEventListener('click', (e) => {
    shortUrl.focus();
    shortUrl.select();
    document.execCommand('copy');
    alert('Copied');
});
