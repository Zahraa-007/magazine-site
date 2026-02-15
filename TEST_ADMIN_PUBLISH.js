/**
 * Test Admin Publishing Functionality
 * Run this in browser console on http://localhost:8001/admin-dashboard.html
 */

// Test 1: Verify getPublishedArticles endpoint exists
console.log('=== Test 1: Testing getPublishedArticles endpoint ===');
fetch('http://localhost:5000/api/articles/published')
  .then(res => res.json())
  .then(data => {
    console.log('✅ GET /api/articles/published works');
    console.log('Published articles:', data);
  })
  .catch(err => console.error('❌ Error:', err));

// Test 2: Admin can publish article
console.log('\n=== Test 2: Testing admin publish ===');
const testArticle = {
  title: 'Test Article - ' + new Date().toLocaleTimeString(),
  content: 'This is a test article published at ' + new Date().toISOString(),
  content_type: 'article',
  category_id: 'general',
  author_name: 'Test Admin',
  image_url: 'https://placehold.co/600x400/07234a/ffffff?text=Test+Article',
  tags: ['test', 'demo']
};

fetch('http://localhost:5000/api/articles/publish/admin-publish', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-User-Role': 'admin'
  },
  body: JSON.stringify(testArticle)
})
  .then(res => res.json())
  .then(data => {
    if (data.id) {
      console.log('✅ Article published successfully!');
      console.log('Article ID:', data.id);
      console.log('Status:', data.status);
      console.log('Content Type:', data.content_type);
    } else {
      console.error('❌ Error:', data.error);
    }
  })
  .catch(err => console.error('❌ Network error:', err));

// Test 3: Verify published articles appear in list
console.log('\n=== Test 3: Verifying published articles ===');
setTimeout(() => {
  fetch('http://localhost:5000/api/articles/published')
    .then(res => res.json())
    .then(data => {
      console.log('✅ Total published articles:', data.length);
      data.forEach((article, idx) => {
        if (idx < 3) {
          console.log(`  ${idx + 1}. ${article.title} (${article.content_type})`);
        }
      });
    })
    .catch(err => console.error('❌ Error:', err));
}, 2000);

console.log('\n=== Tests Running ===');
console.log('Check console output above for results');
