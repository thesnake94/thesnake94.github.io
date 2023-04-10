import os
os.environ['PYGAME_HIDE_SUPPORT_PROMPT'] = "hide"
import pygame
import random

def init_pygame():
    pygame.init()
    pygame.font.init()

def all_color():
    white = (255, 255, 255)
    black = (0, 0, 0)
    red = (213, 50, 80)
    green = (0, 255, 0)
    blue = (50, 153, 213)
    return white, black, red, green, blue

def window():
    init_pygame()
    width = 600
    height = 400
    dis = pygame.display.set_mode((width, height))
    pygame.display.set_caption('Snake Game by Dayen')
    return dis, width, height

def create_clock():
    clock = pygame.time.Clock()
    return clock

def create_values():
    snake_block = 10
    snake_speed = 15
    return snake_block, snake_speed

def create_font():
    font_style = pygame.font.SysFont(None, 30)
    return font_style


def the_snake(dis, green, snake_block, snake_List):
    for x in snake_List:
        pygame.draw.rect(dis, green, [x[0], x[1], snake_block, snake_block])

def message(msg, color, dis, width, height):
    font_style = pygame.font.SysFont(None, 30)
    message = font_style.render(msg, True, color)
    dis.blit(message, [round(width / 6), round(height / 3)])
    second_message = font_style.render("Appuie sur F pour fermer ou R pour rejouer", True, color)
    dis.blit(second_message, [round(width / 6), round(height / 2)])

def game_intro(dis, width, height, clock, white, black):
    intro = True
    while intro:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_f:
                    pygame.quit()
                    quit()
                if event.key == pygame.K_c:
                    intro = False
        dis.fill(black)
        font_style = pygame.font.SysFont(None, 50)
        message = font_style.render("Bienvenue au jeu Snake !", True, white)
        dis.blit(message, [width/6, height/4])
        font_style = pygame.font.SysFont(None, 30)
        message = font_style.render("Appuie sur C pour commencer ou F pour fermer", True, white)
        dis.blit(message, [width/6, height/2])
        pygame.display.update()
        clock.tick(15)

def gameLoop(dis, width, height, snake_block, snake_speed, white, black, red, blue, clock, green):
    game_over = False
    game_close = False
    
    snake_speed = 19
 
    x1 = width / 2
    y1 = height / 2
 
    x1_change = 0
    y1_change = 0
 
    snake_List = []
    Length_of_snake = 1
 
    foodx = round(random.randrange(0, width - snake_block) / 10.0) * 10.0
    foody = round(random.randrange(0, height - snake_block) / 10.0) * 10.0
 
    score = 0

    while not game_over:
 
        while game_close == True:
            dis.fill(white)
            message("Game over ! Votre score est de " + str(score) + " points", red, dis, width, height)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_f:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_r:
                        gameLoop(dis, width, height, snake_block, snake_speed, white, black, red, blue, clock, green)

 
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT or event.key == pygame.K_q:
                    x1_change = -snake_block
                    y1_change = 0
                elif event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                    x1_change = snake_block
                    y1_change = 0
                elif event.key == pygame.K_UP or event.key == pygame.K_z:
                    y1_change = -snake_block
                    x1_change = 0
                elif event.key == pygame.K_DOWN or event.key == pygame.K_s:
                    y1_change = snake_block
                    x1_change = 0
 
        if x1 >= width or x1 < 0 or y1 >= height or y1 < 0:
            game_close = True
 
        x1 += x1_change
        y1 += y1_change
        dis.fill(black)
        pygame.draw.circle(dis, blue, (round(foodx) + round(snake_block/2), round(foody) + round(snake_block/2)), round(snake_block/2))
 
        snake_Head = []
        snake_Head.append(x1)
        snake_Head.append(y1)
        snake_List.append(snake_Head)
        if len(snake_List) > Length_of_snake:
            del snake_List[0]
 
        for x in snake_List[:-1]:
            if x == snake_Head:
                game_close = True
 
        the_snake(dis, green, snake_block, snake_List)
        pygame.display.update()
 
        if x1 == foodx and y1 == foody:
            foodx = round(random.randrange(0, width - snake_block) / 10.0) * 10.0
            foody = round(random.randrange(0, height - snake_block) / 10.0) * 10.0
            Length_of_snake += 1
            score += 10
            snake_speed += 1

        clock.tick(snake_speed)
 
        clock.tick(snake_speed)
 
    pygame.quit()
    quit()
 
def main():
    dis, width, height = window()
    clock = create_clock()
    white, black, red, green, blue = all_color()
    snake_block, snake_speed = create_values()
    font_style = create_font()

    init_pygame()

    game_intro(dis, width, height, clock, white, black)

    gameLoop(dis, width, height, snake_block, snake_speed, white, black, red, blue, clock, green)


if __name__ == '__main__':
    main()