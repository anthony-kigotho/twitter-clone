let userSelection = document.querySelector('#users');
let userInfo = document.querySelector('.user-info');
let userPosts = document.querySelector('.posts');
let commentsContainer = document.querySelector('.comments');



function fetchUsers() {
    const promise = new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            let users = response.json();
            resolve(users);
        })
        .catch(error => {
            reject(error);
        });
    })
    return promise;
}

function fetchPosts() {
    const promise = new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            let posts = response.json();
            resolve(posts);
        })
        .catch(error => {
            reject(error);
        })
    })
    return promise;
}

function fetchComments() {
    const promise = new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(response => {
            let comments = response.json();
            resolve(comments);
        })
        .catch(error => {
            reject(error);
        })
    })
    return promise;
}

function renderUserInfo(user) {
    userInfo.innerHTML= `
        <img id="profile-image" src="data:image/jpeg;base64,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" alt="">
        <h4 id="user-name">${user.name}</h4>
        <p>@${user.username}</p>
        <a href="${user.website}">Link to my website</a>
        <p><i class="fa fa-map-marker" aria-hidden="true" style="color: #1da1f2;"></i> ${user.address.city}</p>
        `
}


function renderPosts(posts) {
    let userName = document.querySelector('#user-name').textContent;
    let allposts = '';
    posts.map(post => {
        allposts += `
        <div class="post" id="${post.id}">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhAREBAVEBUXEBUVFRUQEBAVFRAVFRUWFhcVFRMYHSghGBolGxUVITEiJSkuLi46GB8zODMuNygtLysBCgoKDg0OFxAQFy0dHR0rLSstLSstLSstLS0rLS0rKy0rLS0tLSstKy0rLS0tLSsrLS0tLS0tLTcrKy0tLSsrLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAwUBAgQGBwj/xAA/EAACAQIDBAcECAUDBQAAAAAAAQIDEQQSIQUxQWEGEyJRcYGRMqGx0RQjQlJygsHwM0NikuEHFsMVJHOiwv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/8QAIBEBAQACAgMAAwEAAAAAAAAAAAECESFBAxIxBEJRE//aAAwDAQACEQMRAD8A+WmAA6gACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGLhGQXOF6L4mabyxp6adZLV/wBqdvOx0UeiU/t4inH8Geb9GkT2jXrl/Hngeg/2zC6isXFPjnpTX9uupybT6P1qMc8stSN2nKm8yjzfJr/I3EuOSqAuCoAAKAAAAAAAAAAAAAAAAAAAAAAAABsw2X/RjYSrZqlaL6pR7N3KKqt3vaSd0lbfxvyZLdJJcrqOXYewp4i8r9XSTs5uz1XCMeL9x6Ols/CUn9WoSldWlXlmy24pLRMY3G1HJQptZUrJZk0orT96kM61KnHKr1JN6ykl6JX/AFMb27TGR3TkqUs7lCrGW9RlPf8A09z87ciWhtSnraCtxTtL80X+nvKCVOcruMNH9xNe75kUqU43umu//JNL7PT1pUKsXGdNX4NNrfuaf7+XBRU6d43zwemurjyfeufAoZbQt2b6rmtb71+ptLbD+1o+DWl+a+Hiipc4mxmxacot011ct9rvI7u1uWqZ56UWm01Zp2afBrej1Gz6qkpu17xfhrrpG2njuV2U+2aFpKferS8Ytxv5qKLGMp3FcADbAAAoAAAAAAAAAAAAAAAAAAAACLbozgHUrRkqihklGVrvNLXckuHzPYbTnmf8TL+HK/RtXPI7Brwpwrzd8zcILLvyybul4218C4q4mCp2jGpffbNdvxb3eVjnXXDiMVHQbacJyl3xlNv0loarZLlrDMvxwy+9NlLVnK911i8JW/8ArUjdbEu1p1Eu9zf6tjRclnUw9WDt2fy1ofO5BiqNV79Hwak5etkcspTTjmnJ3VlK71d3dX/e5nU8XJKzqPkpNy9Ib38OYTcVlWhU+3ma+9ZtFjRpRlFKcU3ffvUufJ2tfvtr3kdKc07uo6fNzhBv8l3cnrSlZN11PXjTlFr8ydipNO7Z8eqkpR0tqt/xk9f3wI+kNROo3JW7C0y2Turuy8zjpbZcJK+Wot9nKz/uWnrqbbb27GvlcaWWSVszkmkuFlZE0tymlJONm13OxgA25wABVAAAAAAAAAAAAAAAAAAAAAG9CdpRb3XVy9ljVoo3buleyd29EoR4vgvnv8+WvRfDVZ4hSoVqdCpThOrGda2RZVazumrvNbcZpjelyuj+LlOMFTyt73LXq7b730zbtZeSW49JsnoZCHarPrpf1axX5ePnpyRc9E+lFWr1lLE0YQqRinGdCalTrJXTsr9m2ml+LKnbXTbHRqypYehRpqL1qVnJxknut2lbRq/dZ+Jxtt4erCTGb1te1dkUpxyzpqata0oxat4WseY2z0EU7/RpOEnracpZfBRS09/kd+ztvbTqrNDE7LqNa5FKvJu3BtOyPb7PxXWwjOdLqai0lBSU4p98J8Yvml4GeZ21lZn9xfnWpKVKc6et4TlF9qaV4tq+VNdxHVrSl7Tb+HofWf8AUXorSnSq4inDLVjBzTitaiiryhJcXlvbjuPkKZ3wy9o8nkxuNbAsMJsLF1aUsRSw1SdKKbc1HSy1bit8kuLinYrkzTLIAKAACgAAAAAAAAAAAAAAAAAAAAAWPRnZ30jF4Wg45ozrRzrX+Gnmqbv6FIri16LTtiqSva917r/oSknL3+B2lhMPXytN9XCpTdWOrqTnLWdXjKyzK6V9fM7cfsqhiodmrGonv6ucM9k75WmnbhvR85leLcJe1FuL8Voayqy4O/iv1OXpvnb0Y+X141w+nUOjEJ04UWk1Go6nWT/jN/8AkTvbRbrHpcJSo0I26xLvdSp+smfCfpL7kOvfJeCRLhv7T/STiR9e6Q9I8MoShCrGpLLKyh2ldppJyWi1PnfRXohCfWVq01VpUct6e5zbW+av7C00vrr3a0rqt8X6nq/9Pqkb4mnJq01TTi/tJZ7/ABFnrODGzPKSvWU6kY0ZTqrq5U5KTlJ9mEUm+yvspKO7kfE5yTlJxjlTk2o/dTd1HyWh7z/UrblPTB4ZpLR1csr2t7NNvi+L10slxZ4JI145xtn8jOW6nQADq4AACgAAAAAAAAAAAAAAAAAAAAIEuErunOE19mSfknqvQiMNhF/0kdq7mt00pefH9Cu643xFfPRpu93HT00+RwqRiRq3l1ZzKkc2c26wujbpzF70NwsqtZq14RtOd43u4u8I8u12vyFPsnZ9TETUYLS9nLgv8n13YWzIUKUKUFbdmfGUnvk33nPPLXD0eHC2+3T470joxhi8XCCso4ipGy3XUmpe+5wHpulXR2rmxWNgpTpPFVpSvBxdNSrT7Ss2pwvpdO60vFHmEzrHmv1kAFAABQAAAAAAAAAAAAAAAAC51YTZ1SpHOlGELv6yrOMIXXBX1m76Wgm+QRyk+BwNWtJxo05VWt+RXUecpborm2kd0Z4aj/L+lT76rlGkvClFpy8ZS/KiHG7brVIqDkowXs06cYwpx8KcUo352uTY6quw4U2liMXTXZvJYaPXuOr7LleME9OEmen2fsTBYeHW1sPOrKSvTpYqUczT+3OlFKMI9ylmb5HP0L2UqdGW0cSs+uXDU5rSU7u1Vrik07fhb7mcuMxkpVJyqScnJ5sz46ambXTHHtX9IsbOtUm7LLCnCNoRUY003LLGMVuWpQl/gKizYjNrmkk0+Ky/5OnYPQari5T6rEUYRi9VUdR1Et6ago2a/MN6ZuNvx5e5Z7D2JUxElo1Dv+94cuZ6z/Y9GjKHWOdVqaU1K0Y66XSjrbzZ7PZezIpLRU4LgtL9yOeXl/j0eP8AH7zcOwdjRpRSjHRLVpaeC5X9T0EYWUJPjL3IlUlNqEFlgt9u5FT0t2sqMJyX2Y2ivvSekY+bsvJnL69FvTzvR3FyjUr4at26VXEV6coS3LNUnDT8T3/iKHbfQukqeIrYKrN9Q5qrRrWco5PayySWlk2r3v3p6EmCxElKm3K7U1KUu9p3lLxbv7+4ssVWqZtt9TCU3KNaCjTi5SveMLpLV2zM9ErxWTT5smDWJsdHIAAUAAAAAAAAAAAAAAAEWHR2FGWKoLExcqWducV9pKMmlvWmZRvyueg29s6NaacMS4wilGnCeHyxpxW6Mcs2kvCKXJHkIzaaktGmmvIt1tu/8t+Tv+hmtY67JdHJX0xFB+P0hf8AGy8wXR7BQj9Zmxkra/8AdU8NBeCzKXrLyRUf9Rf3JesfmRy2j3wn6J/BmeWtYvVbVxlSVKFOlh1Tpw1jGnXpVm9FFXcZt2UVZaaHmMXVfGLi/wCqLVvUie0YcW14xYWNi90l6gtc/WWbfevhuOzZO2Z0KqqRk1wdu7vtxIJTi96T9CCdKL3aeD+ZdJLZdx9g2Zj4YqmpaNpK9nffuafc9TohSlF6O8e5vVHybo5tWphKsakX1kL2nTbtmi99nwlxvyVz6nhNv4Osk6WJgm/5dV9XNPutK2Z+FzhlhY9mHmmU1eF3QahSc+L/AGvmfK+l21lVrKnGWaNNttp3Tqbv/VaeLZadPel/ahgcNLdZVqkXubWtOL7+98N2+9vn6qZXJc38TeGHdcfL5f1i5lisqst79xbbL6SThOM6bjnnPPWll7MssHG3m7yk1xatuPIXcvadl3cZFhhnysv3v+RvTlMtrTpZhqeLrOthezVcIupRkkutdtZ05bpT3Jxdm7Jq70PItNNpppp2aaacWt6ae5l1WdrNb73vxudUcRTrJRxEVJ2spvSXlNarw1jyZZWbHmwWuO2HOPapN1Y91vrI+KWkvGPoiratdNWa3p6NPuaNSs/GAAVQAAAAAAAAAAADejTcpRit7dvm/TUI6sBgHPV6R97LWnQhFWil7jjoSyS09n4E3WWlbg9VyMV0moklbkQzkiOrGzNBpK2bNHBcUvRGbm6h3gQ9THu9NPgZ+jrmvP5k6RhsGnL1Dutbq+vDTxI8RRkm0ldcNx1Nm9V6+QTSvo05Z4PLbtLhzJa9CTnK2iv3nTGWq8UStdt8imkWGwSWsnflu9e86jDZq5EVrWenmRG9TcRXGh1YfGShonddz4eD4FPiJXnN985P1bZYRK2p7UvxP4liZNQAaZAAFAAAAAAAAC22NRtGpVf3XGPpq/gvUqbX0W89N1ShTyLhBrxdtX6mbVxnKtZq5XVjSU7aPdwf6Mw2QTzldJkdzaO40YVPSWlzZs2w84rWUc6y6K8lrpxXmbKdO253zN311VmlG1/B35vypbEDZq2S4mrB3ywUe1pZzbcdd7bt3cOJztkQbJMQvZ/CRE+J9mn+H5BUC3rxOup7c/L4I40zsxWlSfl8ECNWzVyMORq2AkyNGWzCAkuVs978X8TvkzgnvfiyxmtQAaAAAAAAAAAABHTs2nepHk0/foXWJq71yK3ZkbK/fL3L9sl2o+zdb0zFbx4iKor6M5s1nlfkySjWzLXf8eZpXjdFZT4d3XgJkOCnrbvXwJ6yIsbp6LwMNmsZaLwNWwrLZq2YbMBGcx14tfV0ny+RxNnbjH9VQ8H7gscbZ37Q0qz8I/Armyw2r/EfOEX7gOdyNGzDka3CN0zKZpEzNgatnJLe/E6rnLLe/EsSsAA0AAAAAAAAAACLDAS7L5P5MmrO/ocWBqWbXf8AFHXIw1PitknF+BPmurmcTC+vE56bKz8ZjLLJPmWFfcyumd1KV6fgmvQLGkXoYbNYs1lIG2wNLi40ja537TnDJhowak1QTm072nOTbi+5pZUV1xcaVlss9ue3TffRh8WVTZY7blrQ54Wk/wC5OX6jRPlcVwiO5JFASRNKktTeKIJPVkg3gzmbJ09G+RzmozQAFUAAUAAAAAAAAOiGK4S9SGMrcE/FXN+vfLyRKidyT3O5zTVmZdZmspXENsSOrAy9qPejkN6dRppoUboEeYZgJAR5hmKJAR5hmBtIb1q0pZc0r5YRgtFpGKtFadyIMxjMBKSRIFM2VbkSm3S3ZNnNczKu2rWI8xJC1JVeiRCbTnc1NAAAoAAAAAAAAAAAAAAAiAAKAABAABQABAAAAAQAAGQAFagAAoAAAAA//9k=" alt="">
            <div class="post-info">
                <p>${userName} <i class="fa-solid fa-certificate"></i> <i class="fa-brands fa-square-twitter"></i></p>
                <p>${post.body}</p>
                <div>
                    <button class="post-comments"><i class="fa fa-comment"></i> 180</button>
                    <button class="post-retweets"><i class="fa fa-retweet" aria-hidden="true"></i> 180</button>
                    <button class="post-likes"><i class="fa fa-heart" style="color: red" aria-hidden="true"></i>180</button>
                </div>
            </div>
        </div>
        `
    })
    userPosts.innerHTML = allposts;

    let commentsBtn = document.querySelectorAll('.post-comments');
    commentsBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let postID = btn.parentNode.parentNode.parentNode.id;
            renderComments(postID);
        })
    })
}

function renderComments(postID) {
    let allComments = `<p id="comment-title" style="margin-top: -30px; padding-bottom: 10px;">Post ${postID} comments</p>`;
    fetchComments().then(comments => {
        let postComments = comments.filter(comment => comment.postId == postID);
        return postComments;
    }).then(postComments => {
        postComments.map(comment => {
            allComments += `
                <div class="comment">
                    <img src="data:image/jpeg;base64,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" alt="">
                    <div class="post-info">
                        <p>${comment.name} <i class="fa-solid fa-certificate"></i> <i class="fa-brands fa-square-twitter"></i></p>
                        <p>${comment.body}</p>
                        <div>
                            <button class="comment-comments"><i class="fa fa-comment"></i> 100</button>
                            <button class="comment-retweets"><i class="fa fa-retweet" aria-hidden="true"></i> 100</button>
                            <button class="comment-likes"><i class="fa fa-heart" aria-hidden="true" style="color: red"></i> 100</button>
                        </div>
                    </div>
                </div>
            `;
        })
        commentsContainer.innerHTML = allComments;

    })


}

fetchUsers().then(users => {
    users.map(user => {
        const option = document.createElement('option');
        option.value = `${user.id}`;
        option.text = `${user.name}`; 
        
        userSelection.appendChild(option);
    })
    return users[0];
}).then(user1 => {
    renderUserInfo(user1);
    return user1.id;
}).then(userID => {
    fetchPosts().then(posts => {
        const myPost = posts.filter(post => post.userId == userID)
        renderPosts(myPost);
    })
}).catch(error => {
    console.error('Error:', error);
})

renderComments(1);


userSelection.addEventListener('change', () => {
    let userID = userSelection.value;
    fetchUsers().then(users => {
        const user = users.filter(user => user.id == userID)
        return user[0];
    }).then(user => {
        renderUserInfo(user);
        return user.id;
    }).then(userID => {
        fetchPosts().then(posts => {
            const myPost = posts.filter(post => post.userId == userID)
            renderPosts(myPost);
            renderComments(myPost[0].id);
        })
    }).catch(error => {
        console.error('Error:', error);
    })
});
