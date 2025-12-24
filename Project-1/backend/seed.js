const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected for seeding'))
  .catch(err => console.log('Connection error:', err));

const sampleBooks = [
  { title: "The Metamorphosis", author: "Franz Kafka", genre: "Absurdist", price: 199, description: "A man wakes up transformed into a giant insect.", image: "https://m.media-amazon.com/images/I/71e6ygCmDvL.jpg" },
  { title: "The Trial", author: "Franz Kafka", genre: "Absurdist", price: 250, description: "A man arrested and prosecuted by a remote, inaccessible authority.", image: "https://m.media-amazon.com/images/I/81SMyPg9NHL.jpg" },
  { title: "The Castle", author: "Franz Kafka", genre: "Absurdist", price: 299, description: "A surveyor struggles to gain access to mysterious authorities.", image: "https://m.media-amazon.com/images/I/51ShRlzPzLL.jpg" },
  { title: "Amerika (The Missing Person)", author: "Franz Kafka", genre: "Classic", price: 279, description: "An immigrant's surreal adventures in America.", image: "https://m.media-amazon.com/images/I/61W723A4V-L.jpg" },
  { title: "In the Penal Colony", author: "Franz Kafka", genre: "Absurdist", price: 199, description: "A torture machine in a remote penal colony.", image: "https://m.media-amazon.com/images/I/615eBXpeNkL.jpg" },
  { title: "A Hunger Artist", author: "Franz Kafka", genre: "Short Story", price: 179, description: "A performer starves himself for art.", image: "https://m.media-amazon.com/images/I/619ILRgAsGL.jpg" },
  { title: "The Judgment", author: "Franz Kafka", genre: "Short Story", price: 159, description: "A father condemns his son in a shocking verdict.", image: "https://m.media-amazon.com/images/I/61HOD7+P3xL.jpg" },
  { title: "Letter to His Father", author: "Franz Kafka", genre: "Autobiographical", price: 229, description: "Kafka's intense letter confronting his domineering father.", image: "https://m.media-amazon.com/images/I/711Sf7ZaUsL.jpg" },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", genre: "Philosophical", price: 349, description: "A student commits murder and battles guilt.", image: "https://m.media-amazon.com/images/I/718dmpl-GrL.jpg" },
  { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", genre: "Philosophical", price: 499, description: "Family drama, murder, and questions of faith.", image: "https://m.media-amazon.com/images/I/91Sa+ATy3AL.jpg" },
  { title: "The Idiot", author: "Fyodor Dostoevsky", genre: "Classic", price: 399, description: "A pure-hearted prince in corrupt society.", image: "https://m.media-amazon.com/images/I/81GpBL+tl0L.jpg" },
  { title: "Notes from Underground", author: "Fyodor Dostoevsky", genre: "Philosophical", price: 249, description: "A bitter man's rant against rationality.", image: "https://is1-ssl.mzstatic.com/image/thumb/Publication7/v4/31/c3/ec/31c3ec7c-f9e2-1557-70d8-91b78895c7e2/coverArt.4369b5.jpg/1200x900wz.jpg" },
  { title: "Demons (The Possessed)", author: "Fyodor Dostoevsky", genre: "Political", price: 429, description: "Nihilists and revolutionaries cause chaos.", image: "https://m.media-amazon.com/images/I/81AXxqYAEHL.jpg" },
  { title: "The Gambler", author: "Fyodor Dostoevsky", genre: "Classic", price: 279, description: "Obsessive roulette addiction.", image: "https://m.media-amazon.com/images/I/81+HP1LFWNL.jpg" },
  { title: "White Nights", author: "Fyodor Dostoevsky", genre: "Romance", price: 199, description: "A dreamer falls in love over four nights.", image: "https://cdn.shopify.com/s/files/1/0831/6151/4262/files/il_fullxfull.4098986736_3lfo.jpg?v=1738070313" },
  { title: "I Too Had a Love Story", author: "Ravinder Singh", genre: "Romance", price: 249, description: "A heartbreaking true love story.", image: "https://m.media-amazon.com/images/I/81ilCcnwayL.jpg" },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance", price: 199, description: "Elizabeth Bennet and Mr. Darcy's witty romance.", image: "https://i.etsystatic.com/17937725/r/il/706f1e/6170892697/il_fullxfull.6170892697_10ud.jpg" },
  { title: "1984", author: "George Orwell", genre: "Dystopian", price: 249, description: "Totalitarian surveillance and control.", image: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/a4/6a/81/a46a81da-a5ed-e390-9840-79decabf6c5c/9780547249643.jpg/1200x900wz.jpg" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", price: 299, description: "Racism and innocence in the American South.", image: "https://m.media-amazon.com/images/I/71HZbA0WscL.jpg" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", price: 199, description: "The illusion of the American Dream.", image: "https://m.media-amazon.com/images/I/81T4dS6IkaL.jpg" },
  { title: "Jane Eyre", author: "Charlotte Brontë", genre: "Gothic Romance", price: 279, description: "An orphan's journey to independence and love.", image: "https://i.etsystatic.com/23758874/r/il/ee6278/5414491569/il_fullxfull.5414491569_o0de.jpg" },
  { title: "Moby-Dick", author: "Herman Melville", genre: "Adventure", price: 349, description: "Captain Ahab's obsessive whale hunt.", image: "https://m.media-amazon.com/images/I/91EQgLKb1TL.jpg" },
  { title: "War and Peace", author: "Leo Tolstoy", genre: "Historical", price: 599, description: "Napoleonic wars and Russian aristocracy.", image: "https://m.media-amazon.com/images/I/91FXycpulgL.jpg" },
  { title: "Hamlet", author: "William Shakespeare", genre: "Tragedy", price: 179, description: "Revenge, madness, and existential questions.", image: "https://images2.penguinrandomhouse.com/smedia/9780451526922" },
  { title: "Don Quixote", author: "Miguel de Cervantes", genre: "Classic", price: 449, description: "A delusional knight's chivalric adventures.", image: "https://m.media-amazon.com/images/I/81Nk5PhRpOL.jpg" },
  { title: "Frankenstein", author: "Mary Shelley", genre: "Gothic", price: 229, description: "A scientist creates a monster.", image: "https://prodimage.images-bn.com/pimages/9781435159624_p3_v7_s600x595.jpg" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Coming-of-Age", price: 299, description: "Holden Caulfield's teenage rebellion.", image: "https://m.media-amazon.com/images/I/71fWBj3qq+L.jpg" },
  { title: "Wuthering Heights", author: "Emily Brontë", genre: "Gothic Romance", price: 249, description: "Passionate and destructive love on the moors.", image: "https://i.etsystatic.com/23758874/r/il/93e430/5366372886/il_fullxfull.5366372886_t34f.jpg" },
  { title: "Animal Farm", author: "George Orwell", genre: "Satire", price: 199, description: "Farm animals revolt against humans.", image: "https://m.media-amazon.com/images/I/61MNVWxLHXL.jpg" },
  { title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", price: 279, description: "A technologically controlled society.", image: "https://i0.wp.com/www.raptisrarebooks.com/wp-content/uploads/2022/09/RRB-138100_2.jpg?fit=1250%2C1000&ssl=1" },
  { title: "The Odyssey", author: "Homer", genre: "Epic", price: 299, description: "Odysseus's long journey home.", image: "https://m.media-amazon.com/images/I/81g0AATkO9L.jpg" },
  { title: "Anna Karenina", author: "Leo Tolstoy", genre: "Classic", price: 499, description: "Tragic love and Russian society.", image: "https://m.media-amazon.com/images/I/91vQ60zqC9L.jpg" },
  { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", genre: "Magical Realism", price: 399, description: "The Buendía family's multi-generational saga.", image: "https://m.media-amazon.com/images/I/91GoCrV6emL.jpg" },
  { title: "The Divine Comedy", author: "Dante Alighieri", genre: "Epic Poetry", price: 449, description: "Journey through Hell, Purgatory, and Paradise.", image: "https://m.media-amazon.com/images/I/81-rHfYBAQL.jpg" },
  { title: "Madame Bovary", author: "Gustave Flaubert", genre: "Realism", price: 279, description: "Emma's romantic disillusionment.", image: "https://m.media-amazon.com/images/I/91phtUaLlOL.jpg" },
  { title: "Les Misérables", author: "Victor Hugo", genre: "Historical", price: 599, description: "Redemption and revolution in France.", image: "https://m.media-amazon.com/images/I/81auD7Lpj4L.jpg" },
  { title: "The Picture of Dorian Gray", author: "Oscar Wilde", genre: "Gothic", price: 229, description: "Eternal youth and moral decay.", image: "https://m.media-amazon.com/images/I/81l09bABDAL.jpg" },
  { title: "Great Expectations", author: "Charles Dickens", genre: "Classic", price: 349, description: "Pip's rise and fall in Victorian England.", image: "https://m.media-amazon.com/images/I/8181To6aumL.jpg" },
  { title: "Catch-22", author: "Joseph Heller", genre: "Satire", price: 399, description: "Absurdity of war bureaucracy.", image: "https://i.etsystatic.com/20545894/r/il/7433be/6292894435/il_570xN.6292894435_drms.jpg" },
  { title: "The Little Prince", author: "Antoine de Saint-Exupéry", genre: "Fable", price: 199, description: "A pilot meets a young prince from another planet.", image: "https://m.media-amazon.com/images/I/713AqUXhW1L.jpg" },
  { title: "Lord of the Flies", author: "William Golding", genre: "Allegory", price: 249, description: "Boys descend into savagery on an island.", image: "https://m.media-amazon.com/images/I/518WGq2nARL.jpg" },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Philosophical", price: 299, description: "A shepherd's journey to find treasure.", image: "https://m.media-amazon.com/images/I/512yvitZAAL.jpg" },
  { title: "Fahrenheit 451", author: "Ray Bradbury", genre: "Dystopian", price: 279, description: "A future where books are burned.", image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781668218181/fahrenheit-451-deluxe-slipcase-edition-9781668218181_hr.jpg" },
  { title: "Dracula", author: "Bram Stoker", genre: "Gothic Horror", price: 249, description: "Vampire count threatens England.", image: "https://prodimage.images-bn.com/pimages/9781435159570_p2_v3_s600x595.jpg" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", price: 399, description: "Bilbo Baggins's unexpected adventure.", image: "https://images.squarespace-cdn.com/content/v1/539dffebe4b080549e5a5df5/2d895a69-8797-453a-b26d-d0b83e8a16c5/The-Hobbit-book-Cover-book-print-wall-art-museum-outlets.jpg?format=1000w" },
  { title: "Sense and Sensibility", author: "Jane Austen", genre: "Romance", price: 229, description: "Sisters navigate love and society.", image: "https://images3.penguinrandomhouse.com/smedia/9780593622469" },
  { title: "The Old Man and the Sea", author: "Ernest Hemingway", genre: "Classic", price: 199, description: "An epic struggle with a marlin.", image: "https://m.media-amazon.com/images/I/71RXc0OoEwL.jpg" }
];

Book.then(() => Book.insertMany(sampleBooks))
  .then(() => {
    console.log('Successfully seeded 50 books with perfect covers!');
    mongoose.disconnect();
  })
  .catch(err => console.log('Seeding error:', err));